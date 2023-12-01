import { Buffer } from 'node:buffer';
import type { BinaryLike, KeyObject } from 'node:crypto';
import { createECDH, createHash, createSign } from 'node:crypto';

// Private key for the accessory
// https://github.com/seemoo-lab/openhaystack/blob/main/OpenHaystack/OpenHaystack/HaystackApp/Model/Accessory.swift#L70
export function makePrivateKey() {
  const exchange = createECDH('secp224r1');
  exchange.generateKeys();
  return exchange.getPrivateKey();
}

// https://github.com/seemoo-lab/openhaystack/blob/main/OpenHaystack/OpenHaystack/HaystackApp/Model/Accessory.swift#L154-L164
export function getAdvertisementKey(privateKey: Buffer) {
  const exchange = createECDH('secp224r1');
  exchange.setPrivateKey(privateKey);
  const publicKey = exchange.getPublicKey(null, 'compressed');
  return Buffer.from(publicKey.subarray(1));
}

// https://github.com/NordicSemiconductor/pc-nrfutil/blob/master/nordicsemi/dfu/package.py#L550-L566
export function hashFirmware(firmwarePatched: Buffer) {
  // Calculate SHA256 of the patched firmware
  const firmwareHash = createHash('sha256').update(firmwarePatched).digest();
  // Convert to little endian format
  return Buffer.from(firmwareHash.reverse());
}

// https://github.com/NordicSemiconductor/pc-nrfutil/blob/master/nordicsemi/dfu/signing.py#L90-L101
export function signData(data: BinaryLike, privateKey: KeyObject) {
  // Create a Sign object with SHA256 as hashing algorithm
  const sign = createSign('SHA256').update(data).end();
  // Sign the data using the private key and specify the output format
  const signature = sign.sign({
    key: privateKey,
    dsaEncoding: 'ieee-p1363',
  });
  // Split the buffer into two 32-byte parts and reverse each part
  const r = Buffer.from(signature.subarray(0, 32));
  const s = Buffer.from(signature.subarray(32, 64));
  return Buffer.concat([r.reverse(), s.reverse()]);
}
