import { Buffer } from 'node:buffer';
import { createECDH, createHash, sign } from 'node:crypto';

// Private key for the accessory where the public key is used for  Find My network
// https://github.com/seemoo-lab/openhaystack/blob/main/OpenHaystack/OpenHaystack/HaystackApp/Model/Accessory.swift#L70
export function makePrivateKey() {
  const exchange = createECDH('secp224r1');
  exchange.generateKeys();
  // Get the private key in DER (binary) format
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
  // // Convert to little endian format
  return Buffer.from(firmwareHash.reverse());
}

// https://github.com/NordicSemiconductor/pc-nrfutil/blob/master/nordicsemi/dfu/signing.py#L90-L101
// https://github.com/SpaceInvaderTech/openhaystack/blob/main/OpenHaystack/OpenHaystack/HaystackApp/SpaceInvaderController.swift#L35-L40
export function signData(data: Uint8Array, privateKey: Buffer) {
  // make ECDSA_P256_SHA256 signature
  const signature = sign(null, data, {
    key: privateKey,
    dsaEncoding: 'ieee-p1363',
  });
  // Convert signature to little-endian
  const r = signature.subarray(0, 32); // First 32 bytes for R
  const s = signature.subarray(32, 64); // Next 32 bytes for S
  // Reverse both R and S components for little-endian format
  return Buffer.concat([r.reverse(), s.reverse()]);
}
