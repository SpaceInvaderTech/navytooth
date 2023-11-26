import { createECDH, createHash, createSign } from 'node:crypto';
import type { Accessory } from './types';
import createZipBuffer from './zip';
import { manifest } from './constants';

// https://github.com/seemoo-lab/openhaystack/blob/main/OpenHaystack/OpenHaystack/HaystackApp/MicrobitController.swift#L46-L75
function patchFirmware(firmware: Buffer, pattern: string, publicKey: Buffer) {
  // Convert the pattern string to a Buffer for searching
  const patternBuffer = Buffer.from(pattern, 'binary');
  // Find the position of the pattern in the firmware
  const patternIndex = firmware.indexOf(patternBuffer);
  if (patternIndex === -1) {
    throw new Error('Pattern not found in firmware');
  }
  if (publicKey.byteLength !== patternBuffer.byteLength) {
    throw new Error('Public key is not the same length as the pattern');
  }
  // Create a copy of the firmware to avoid mutating the original buffer
  const patchedFirmware = Buffer.from(firmware);
  // Replace the pattern in the firmware with the public key
  publicKey.copy(patchedFirmware, patternIndex);
  return patchedFirmware;
}

// https://github.com/seemoo-lab/openhaystack/blob/main/OpenHaystack/OpenHaystack/HaystackApp/Model/Accessory.swift#L154-L164
function getAdvertisementKey(privateKey: Buffer, patternLength: number) {
  const curve = createECDH('secp224r1');
  curve.setPrivateKey(privateKey);
  const publicKey = curve.getPublicKey(null, 'compressed');
  const publicKeyTrimmed = publicKey.subarray(1);
  if (publicKeyTrimmed.byteLength !== patternLength) {
    throw new Error('Public key is not the same length as the pattern');
  }
  return publicKeyTrimmed;
}

// https://github.com/SpaceInvaderTech/openhaystack/blob/main/OpenHaystack/OpenHaystack/HaystackApp/SpaceInvaderController.swift#L35-L40
function signData(data: Buffer, privateKey: Buffer) {
  const sign = createSign('SHA256');
  sign.update(data);
  sign.end();
  return sign.sign({ key: privateKey, dsaEncoding: 'ieee-p1363' });
}

// https://github.com/SpaceInvaderTech/openhaystack/blob/main/OpenHaystack/OpenHaystack/HaystackApp/SpaceInvaderController.swift#L63
function generateDFUPackage(patchedFirmware: Buffer, privateKey: Buffer) {
  // Generate the initPacket header
  const initPacketHeader = Buffer.from([
    0x12, 0x8a, 0x01, 0x0a, 0x44, 0x08, 0x01, 0x12, 0x40,
  ]);
  let initPacket = Buffer.from([
    0x08, 0x01, 0x10, 0x34, 0x1a, 0x02, 0x83, 0x02, 0x20, 0x00, 0x28, 0x00,
    0x30, 0x00, 0x38, 0x9c, 0x8d, 0x03, 0x42, 0x24, 0x08, 0x03, 0x12, 0x20,
  ]);
  // Calculate SHA256 of the patched firmware
  const sha256Firmware = createHash('sha256').update(patchedFirmware).digest();
  // Add the SHA256 in reverse order
  const reversedSha256 = Buffer.from(sha256Firmware.reverse());
  initPacket = Buffer.concat([initPacket, reversedSha256]);
  // Add fixed data
  const fixedData = Buffer.from([
    0x48, 0x00, 0x52, 0x04, 0x08, 0x01, 0x12, 0x00,
  ]);
  initPacket = Buffer.concat([initPacket, fixedData]);
  const signature = signData(initPacket, privateKey);
  // Split the signature into R and S components (assuming each is 32 bytes)
  const rComponent = signature.subarray(0, 32);
  const sComponent = signature.subarray(32, 64);
  // Reverse and append R and S to initPacket
  initPacket = Buffer.concat([
    initPacket,
    rComponent.reverse(),
    sComponent.reverse(),
  ]);
  // Prepend the initPacket header
  return Buffer.concat([initPacketHeader, initPacket]);
}

export default async function makeFirmware(
  accessory: Accessory,
  firmware: Buffer,
  pattern: string,
  privateKey: Buffer,
) {
  const publicKey = getAdvertisementKey(accessory.privateKey, pattern.length);
  const patchedFirmware = patchFirmware(firmware, pattern, publicKey);
  const iPack = generateDFUPackage(patchedFirmware, privateKey);
  return createZipBuffer([
    { data: manifest, name: 'manifest.json' },
    { data: iPack, name: 'initpacket.dat' },
    { data: patchedFirmware, name: 'firmware.bin' },
  ]);
}
