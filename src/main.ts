import { Buffer } from 'node:buffer';
import { manifest } from './constants';
import { getAdvertisementKey, hashFirmware, makePrivateKey } from './crypt';
import makeInitPacket from './initpacket';

type PacketProps = {
  firmware: Buffer;
  pattern: string;
  privateKey: Buffer;
};

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

export default async function makePacket({
  firmware,
  pattern,
  privateKey,
}: PacketProps) {
  const privateKeyForAccessory = makePrivateKey();
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
    privateKeyForAccessory,
  };
}
