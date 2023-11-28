import { createECDH, createHash, createSign } from 'node:crypto';
import { Buffer } from 'node:buffer';
import type { Accessory } from './types';
import { packet, manifest } from './constants';

// https://github.com/seemoo-lab/openhaystack/blob/main/OpenHaystack/OpenHaystack/HaystackApp/MicrobitController.swift#L46-L75
function patchFirmware(firmware: Buffer, pattern: string, publicKey: Buffer) {
  // Convert the pattern string to a Buffer for searching
  const patternBuffer = Buffer.from(pattern, 'binary');
  if (patternBuffer.byteLength !== publicKey.byteLength) {
    throw new Error('Public key is not the same length as the pattern');
  }
  // Find the position of the pattern in the firmware
  const patternIndex = firmware.indexOf(patternBuffer);
  if (patternIndex === -1) {
    throw new Error('Pattern not found in firmware');
  }
  // Create a copy of the firmware to avoid mutating the original buffer
  const patchedFirmware = Buffer.from(firmware);
  // Replace the pattern in the firmware with the public key
  publicKey.copy(patchedFirmware, patternIndex);
  return patchedFirmware;
}

// https://github.com/seemoo-lab/openhaystack/blob/main/OpenHaystack/OpenHaystack/HaystackApp/Model/Accessory.swift#L154-L164
function getAdvertisementKey(privateKey: Buffer) {
  const exchange = createECDH('secp224r1');
  exchange.setPrivateKey(privateKey);
  const publicKey = exchange.getPublicKey(null, 'compressed');
  return Buffer.from(publicKey.subarray(1));
}

// https://github.com/NordicSemiconductor/pc-nrfutil/blob/master/nordicsemi/dfu/package.py#L550-L566
function hashFirmware(firmwarePatched: Buffer) {
  // Calculate SHA256 of the patched firmware
  const firmwareHash = createHash('sha256').update(firmwarePatched).digest();
  // Convert to little endian format
  return Buffer.from(firmwareHash.reverse());
}

// https://github.com/NordicSemiconductor/pc-nrfutil/blob/master/nordicsemi/dfu/signing.py#L90-L101
function signData(data: Buffer, privateKey: Buffer) {
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

// https://github.com/SpaceInvaderTech/openhaystack/blob/main/OpenHaystack/OpenHaystack/HaystackApp/SpaceInvaderController.swift#L63-L148
function generateInitPacket(firmwarePatched: Buffer, privateKey: Buffer) {
  const firmwareHash = hashFirmware(firmwarePatched);
  const initPacket = Buffer.concat([
    packet.body,
    firmwareHash,
    packet.fixedData,
  ]);
  const initPacketSigned = signData(initPacket, privateKey);
  return Buffer.concat([packet.header, initPacket, initPacketSigned]);
}

export default function makeFirmware(
  accessory: Accessory,
  firmware: Buffer,
  pattern: string,
  privateKey: Buffer,
) {
  const publicKey = getAdvertisementKey(accessory.privateKey);
  const firmwarePatched = patchFirmware(firmware, pattern, publicKey);
  const initPacket = generateInitPacket(firmwarePatched, privateKey);
  return {
    manifest,
    initPacket,
    firmwarePatched,
  };
}
