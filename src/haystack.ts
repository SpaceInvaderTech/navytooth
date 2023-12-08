import { Buffer } from 'node:buffer';

// https://github.com/seemoo-lab/openhaystack/blob/main/OpenHaystack/OpenHaystack/HaystackApp/MicrobitController.swift#L46-L75
export function patchFirmware(
  firmware: Buffer,
  pattern: string,
  publicKey: Buffer,
) {
  // Convert the pattern string to a Buffer for searching
  const patternBuffer = Buffer.from(pattern, 'binary');
  if (patternBuffer.byteLength !== publicKey.byteLength) {
    throw new Error('Public key is not the same length as the pattern');
  }
  // Find the position of the pattern in the firmware
  const patternIndex = firmware.indexOf(patternBuffer);
  if (patternIndex === -1) {
    return firmware;
    // throw new Error('Pattern not found in firmware');
  }
  // Create a copy of the firmware to avoid mutating the original buffer
  const patchedFirmware = Buffer.from(firmware);
  // Replace the pattern in the firmware with the public key
  publicKey.copy(patchedFirmware, patternIndex);
  return patchedFirmware;
}
