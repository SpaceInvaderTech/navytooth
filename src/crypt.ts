import { Buffer } from 'node:buffer';
import type { DSAEncoding, KeyObject } from 'node:crypto';
import { createECDH, createHash, sign } from 'node:crypto';

// P-224 elliptic curve used for the accessory
const curveName = 'secp224r1';
// ECDSA P256 SHA256 encoding used for the DFU signature
const dsaEncoding: DSAEncoding = 'ieee-p1363';

// Private key for the accessory where the public key is used for  Find My network
// https://github.com/seemoo-lab/openhaystack/blob/main/OpenHaystack/OpenHaystack/HaystackApp/Model/Accessory.swift#L70
export function makePrivateKey() {
  const exchange = createECDH(curveName);
  exchange.generateKeys();
  // Get the private key in DER (binary) format
  return exchange.getPrivateKey();
}

// https://github.com/seemoo-lab/openhaystack/blob/main/OpenHaystack/OpenHaystack/HaystackApp/Model/Accessory.swift#L154-L164
export function getAdvertisementKey(privateKey: Buffer) {
  const exchange = createECDH(curveName);
  exchange.setPrivateKey(privateKey);
  const publicKey = exchange.getPublicKey(null, 'compressed');
  return Buffer.from(publicKey.subarray(1));
}

// little endian hash
export function hashLE(data: Uint8Array) {
  return createHash('sha256').update(data).digest().reverse();
}

// Swap signature from big-endian to little-endian or vice versa
export function endianSwap(signature: Uint8Array) {
  return Buffer.concat([
    Buffer.from(signature.subarray(0, 32)).reverse(),
    Buffer.from(signature.subarray(32, 64)).reverse(),
  ]);
}

// ECDSA P256 SHA256 signature
export function signDataLE(data: Uint8Array, key: KeyObject) {
  return endianSwap(sign('sha256', data, { key, dsaEncoding }));
}
