import _sodium from "npm:libsodium-wrappers-sumo";

await _sodium.ready;
const sodium = _sodium;

const key = sodium.crypto_secretbox_keygen();
const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);

const message = "Hola Deno!";
const cipher = sodium.crypto_secretbox_easy(
  sodium.from_string(message),
  nonce,
  key
);
const plain = sodium.crypto_secretbox_open_easy(cipher, nonce, key);
console.log(sodium.to_string(plain)); // 👉 "Hola Deno!"
