// @ts-expect-error no type declaration
import { Signature, Ecdsa, PrivateKey } from 'starkbank-ecdsa';
import BigInteger from 'big-integer';

function extractSignature(initPacket: Buffer) {
  const initPacketSignature = initPacket.subarray(initPacket.length - 64);
  // Get R and S
  const hexR = Buffer.from(initPacketSignature.subarray(0, 32)).reverse();
  const hexS = Buffer.from(initPacketSignature.subarray(32)).reverse();
  // Convert them to BigInt
  const r = BigInteger(hexR.toString('hex'), 16);
  const s = BigInteger(hexS.toString('hex'), 16);
  return { r, s };
}

export function verifyDataFromPacket(
  initPacket: Buffer,
  privateKeyBuffer: Buffer,
): boolean {
  const { r, s } = extractSignature(initPacket);
  const signature = new Signature(r, s);
  // Extract data to be verified
  const signedInitPacket = initPacket.subarray(9, initPacket.length - 64 - 4);
  // Verify signature
  const publicKey = PrivateKey.fromPem(privateKeyBuffer.toString()).publicKey();
  return Ecdsa.verify(signedInitPacket, signature, publicKey);
}

function signatureObject(signature: Uint8Array) {
  // Get R and S
  const hexR = Buffer.from(signature.subarray(0, 32)).reverse();
  const hexS = Buffer.from(signature.subarray(32)).reverse();
  // Convert them to BigInt
  const r = BigInteger(hexR.toString('hex'), 16);
  const s = BigInteger(hexS.toString('hex'), 16);
  return new Signature(r, s);
}

export function verifyData(
  data: Uint8Array,
  signature: Uint8Array,
  privateKeyBuffer: Uint8Array,
) {
  const publicKey = PrivateKey.fromPem(privateKeyBuffer.toString()).publicKey();
  return Ecdsa.verify(data, signatureObject(signature), publicKey);
}

export function verifyHash(initPacket: Uint8Array, firmwareHash: Buffer) {
  const hashIndex = 33;
  const initPacketFirmwareHash = initPacket.subarray(hashIndex, hashIndex + 32);
  return Buffer.from(initPacketFirmwareHash).equals(firmwareHash);
}
