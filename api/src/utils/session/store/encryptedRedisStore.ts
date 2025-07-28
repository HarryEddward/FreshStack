import type { SessionData } from '@mgcrea/fastify-session';
import type { Redis } from 'ioredis';
import { createCipheriv, createDecipheriv, randomBytes, createHash } from 'crypto';

// Opciones para nuestro constructor
export interface EncryptedRedisStoreOptions {
  client: Redis;
  secret: string;
  prefix?: string;
  ttl?: number;
}

export class EncryptedRedisStore {
  private readonly client: Redis;
  private readonly secret: string;
  private readonly prefix: string;
  private readonly ttl: number;

  constructor(options: EncryptedRedisStoreOptions) {
    this.client = options.client;
    this.secret = options.secret;
    this.prefix = options.prefix ?? 'session:';
    this.ttl = options.ttl ?? 86400; // 1 día por defecto
  }

  private getKey(sid: string): string {
    return `${this.prefix}${sid}`;
  }

  private getAesKey(secret: string): Buffer {
    return createHash('sha256').update(secret).digest();
  }

  private encrypt(data: string): string {
    const key = this.getAesKey(this.secret);
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', key, iv);
    const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted.toString('hex')}`;
  }

  private decrypt(data: string): string | null {
    try {
      const key = this.getAesKey(this.secret);
      const [ivHex, tagHex, encHex] = data.split(':');
      if (!ivHex || !tagHex || !encHex) {
        throw new Error('Invalid encrypted data format');
      }
      const iv = Buffer.from(ivHex, 'hex');
      const tag = Buffer.from(tagHex, 'hex');
      const encrypted = Buffer.from(encHex, 'hex');
      const decipher = createDecipheriv('aes-256-gcm', key, iv);
      decipher.setAuthTag(tag);
      const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
      return decrypted.toString('utf8');
    } catch (err) {
      console.error('Decryption failed:', err);
      return null;
    }
  }

  async get(sid: string): Promise<[SessionData, number | null] | null> {
    const key = this.getKey(sid);
    const encrypted = await this.client.get(key);
    if (!encrypted) return null;

    const decrypted = this.decrypt(encrypted);
    if (!decrypted) return null;

    try {
      const session: SessionData = JSON.parse(decrypted);
      return [session, null]; // no se recupera TTL en esta versión
    } catch (err) {
      console.error('Failed to parse decrypted session JSON:', err);
      return null;
    }
  }

  async set(sid: string, session: SessionData, expiry?: number | null): Promise<void> {
    const key = this.getKey(sid);
    const stringified = JSON.stringify(session);
    const encrypted = this.encrypt(stringified);
    const ttl = expiry ?? this.ttl;

    await this.client.set(key, encrypted, 'PX', ttl * 1000);
  }

  async destroy(sid: string): Promise<void> {
    const key = this.getKey(sid);
    await this.client.del(key);
  }

  async touch(sid: string, expiry?: number | null): Promise<void> {
      const key = this.getKey(sid);
      const ttl = expiry ?? this.ttl;
      await this.client.pexpire(key, ttl * 1000);
  }

}
