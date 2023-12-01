import type { KeyObject } from 'node:crypto';
import { createECDH, createHash } from 'node:crypto';
import { Buffer } from 'node:buffer';
import { manifest } from './constants';
import makeInitPacket from './proto/initPacket';

type PacketProps = {
  firmware: Buffer;
  pattern: string;
  privateKey: KeyObject;
  privateKeyForAccessory?: Buffer;
};

// Private key for the accessory
function makePrivateKey() {
  const exchange = createECDH('secp224r1');
  exchange.generateKeys();
  return exchange.getPrivateKey();
}

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

export default async function makePacket({
  firmware,
  pattern,
  privateKey,
  privateKeyForAccessory = makePrivateKey(),
}: PacketProps) {
  const publicKey = getAdvertisementKey(privateKeyForAccessory);
  const firmwarePatched = patchFirmware(firmware, pattern, publicKey);
  const initPacket = await makeInitPacket(
    hashFirmware(firmwarePatched),
    firmwarePatched.byteLength,
    privateKey,
  );
  return {
    manifest,
    initPacket,
    firmwarePatched,
  };
}
