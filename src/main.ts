import {
  createPrivateKey,
  createPublicKey,
  createHash,
  createSign,
  type KeyObject,
} from 'node:crypto';
import type { Accessory } from './types';
import createZipBuffer from './zip';

const manifestBuffer = Buffer.from(
  JSON.stringify({
    manifest: {
      application: {
        bin_file: 'firmware.bin',
        dat_file: 'initpacket.dat',
      },
    },
  }),
);

// https://github.com/SpaceInvaderTech/openhaystack/blob/main/OpenHaystack/OpenHaystack/HaystackApp/SpaceInvaderController.swift#L171
function patchFirmware(
  firmware: Buffer,
  pattern: string,
  publicKey: Buffer,
): Buffer {
  // Convert the pattern string to a Buffer for searching
  const patternBuffer = Buffer.from(pattern, 'binary');
  // Find the position of the pattern in the firmware
  const patternIndex = firmware.indexOf(patternBuffer);
  if (patternIndex === -1) {
    throw new Error('Pattern not found in firmware');
  }
  // Ensure the public key is not larger than the pattern
  if (publicKey.length !== patternBuffer.length) {
    throw new Error('Public key is not the same length as the pattern');
  }
  // Create a copy of the firmware to avoid mutating the original buffer
  const patchedFirmware = Buffer.from(firmware);
  // Replace the pattern in the firmware with the public key
  publicKey.copy(patchedFirmware, patternIndex);
  return patchedFirmware;
}

// https://github.com/SpaceInvaderTech/openhaystack/blob/main/OpenHaystack/OpenHaystack/HaystackApp/Model/Accessory.swift#L154
function getAdvertisementKey(
  privateKey: Accessory['privateKey'],
  patternLength: number,
) {
  const privateKeyBuffer = createPrivateKey({
    key: privateKey,
    format: 'pem', // or 'der' if the key is in DER format
    type: 'pkcs8', // This might need to be adjusted based on the key format
  });
  const publicKeyBuffer = createPublicKey(privateKeyBuffer);
  const publicKeyBytes = publicKeyBuffer.export({
    type: 'spki',
    format: 'der', // or 'pem' if needed
  });
  // todo: use subarray
  return publicKeyBytes.slice(1, patternLength + 1);
}

// https://github.com/SpaceInvaderTech/openhaystack/blob/main/OpenHaystack/OpenHaystack/HaystackApp/SpaceInvaderController.swift#L202
async function patchFirmwareForAccessory(
  accessory: Accessory,
  firmware: Buffer,
  pattern: string,
) {
  const publicKey = getAdvertisementKey(accessory.privateKey, pattern.length);
  return patchFirmware(firmware, pattern, publicKey);
}

function signData(data: Buffer, privateKey: KeyObject) {
  const sign = createSign('SHA256');
  sign.update(data);
  sign.end();
  return sign.sign({ key: privateKey, dsaEncoding: 'ieee-p1363' });
}

// https://github.com/SpaceInvaderTech/openhaystack/blob/main/OpenHaystack/OpenHaystack/HaystackApp/SpaceInvaderController.swift#L63
async function generateDFUPackage(
  accessory: Accessory,
  firmware: Buffer,
  pattern: string,
  privateKey: KeyObject,
) {
  const patchedFirmware = await patchFirmwareForAccessory(
    accessory,
    firmware,
    pattern,
  );
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
  // todo: use subarray
  const rComponent = signature.slice(0, 32);
  const sComponent = signature.slice(32, 64);
  // Reverse and append R and S to initPacket
  initPacket = Buffer.concat([
    initPacket,
    rComponent.reverse(),
    sComponent.reverse(),
  ]);
  // Prepend the initPacket header
  const finalInitPacket = Buffer.concat([initPacketHeader, initPacket]);
  // done
  return { finalInitPacket, patchedFirmware };
}

export default async function makeFirmware(
  accessory: Accessory,
  firmware: Buffer,
  pattern: string,
  privateKey: KeyObject,
) {
  const { finalInitPacket, patchedFirmware } = await generateDFUPackage(
    accessory,
    firmware,
    pattern,
    privateKey,
  );
  return createZipBuffer([
    { data: manifestBuffer, name: 'manifest.json' },
    { data: finalInitPacket, name: 'initpacket.dat' },
    { data: patchedFirmware, name: 'firmware.bin' },
  ]);
}
