import type { KeyObject, webcrypto } from 'node:crypto';
import { subtle } from 'node:crypto';

const algorithmImport: webcrypto.EcKeyImportParams = {
  name: 'ECDSA',
  namedCurve: 'P-256',
};
const algorithmVerify: webcrypto.EcdsaParams = {
  ...algorithmImport,
  hash: { name: 'SHA-256' },
};
const keyUsages: webcrypto.KeyUsage[] = ['verify'];
const pemRegex = /----\n([\s\S]+)\n----/;

// Convert KeyObject to CryptoKey
function keyObjectToCryptoKey(publicKey: KeyObject) {
  const pemKey = publicKey.export({
    type: 'spki',
    format: 'pem',
  }) as string;
  const pemKeyMatch = pemKey.match(pemRegex);
  if (!pemKeyMatch || pemKeyMatch.length < 2) {
    throw new Error('Invalid PEM key');
  }
  const binaryString = Buffer.from(pemKeyMatch[1], 'base64').toString('binary');
  const bytes = new Uint8Array(
    Array.from(binaryString, (char) => char.charCodeAt(0)),
  );
  return subtle.importKey(
    'spki',
    bytes.buffer,
    algorithmImport,
    false,
    keyUsages,
  );
}

export async function validateSignature(
  data: Buffer,
  signature: Buffer,
  publicKey: KeyObject,
) {
  const cryptoKey = await keyObjectToCryptoKey(publicKey);
  return subtle.verify(algorithmVerify, cryptoKey, signature, data);
}
