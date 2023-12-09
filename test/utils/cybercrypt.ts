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
  if (publicKey.type !== 'public') {
    throw new Error('KeyObject must be a public key');
  }
  const pemKey = publicKey.export({
    type: 'spki',
    format: 'pem',
  });
  const pemKeyMatch = pemKey.toString().match(pemRegex);
  if (!pemKeyMatch || pemKeyMatch.length < 2) {
    throw new Error('Invalid PEM key');
  }
  const binaryString = Buffer.from(pemKeyMatch[1], 'base64').toString('binary');
  const keyData = Buffer.from(
    new Uint8Array(Array.from(binaryString, (char) => char.charCodeAt(0))),
  );
  return subtle.importKey('spki', keyData, algorithmImport, false, keyUsages);
}

export async function validateSignature(
  data: Uint8Array,
  signature: Uint8Array,
  publicKey: KeyObject,
) {
  const cryptoKey = await keyObjectToCryptoKey(publicKey);
  return subtle.verify(algorithmVerify, cryptoKey, signature, data);
}
