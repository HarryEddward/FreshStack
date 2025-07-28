import { encodeBase64Url } from "$std/encoding/base64url.ts";
import { crypto } from "https://deno.land/std@0.192.0/crypto/mod.ts";

// Generar code_verifier
const codeVerifier = encodeBase64Url(crypto.getRandomValues(new Uint8Array(32)));
// Ejemplo: "M25iTXp1Mjk1OGhk..."

console.log(codeVerifier);

// Generar code_challenge
const codeChallenge = encodeBase64Url(
  await crypto.subtle.digest("SHA-256", new TextEncoder().encode(codeVerifier))
);
// Ejemplo: "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM"

console.log(codeChallenge);