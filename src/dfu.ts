import { Buffer } from 'node:buffer';
import { hashLE, signDataLE } from './crypt';

// known unknowns: https://github.com/acalatrava/moko_signer/blob/b9b3d9ffa65f1c223c57809a6d4385ed64ebc168/index.js#L18
const mystery = {
  buf0: Buffer.from([0x12, 0x8a, 0x01, 0x0a, 0x44, 0x08, 0x01, 0x12, 0x40]),
  buf1: Buffer.from([
    0x08, 0x01, 0x10, 0x34, 0x1a, 0x02, 0x83, 0x02, 0x20, 0x00, 0x28, 0x00,
    0x30, 0x00, 0x38, 0x9c, 0x8d, 0x03, 0x42, 0x24, 0x08, 0x03, 0x12, 0x20,
  ]),
  buf2: Buffer.from([0x48, 0x00, 0x52, 0x04, 0x08, 0x01, 0x12, 0x00]),
  buf3: Buffer.from([0x10, 0x00, 0x1a, 0x40]),
};

export function makeInitPacket(patchedFirmware: Buffer, privateKey: Buffer) {
  const initPacket = Buffer.concat([
    mystery.buf1,
    hashLE(patchedFirmware),
    mystery.buf2,
  ]);
  return Buffer.concat([
    mystery.buf0,
    initPacket,
    mystery.buf3,
    signDataLE(initPacket, privateKey),
  ]);
}
