import { test, expect } from 'bun:test';
import { readFile } from 'node:fs/promises';
import {
  createECDH,
  createPrivateKey,
  createPublicKey,
  sign,
} from 'node:crypto';
import { getAdvertisementKey, signDataLE, endianSwap } from '../src/crypt';
import { validateSignature } from '../src/cybercrypt';

// ecdsa-sha2-nistp256
const privateKeyPath = '../private.pem';

// from plist for EA140CF93E0D
const privateKeyDeviceBase64Hex = 'bwaa+RfcHRvgbfwjBRKBuHVAW2wEHlrlPNpvDw==';
const privateKeyDeviceBuffer = Buffer.from(privateKeyDeviceBase64Hex, 'base64');
const publicKeyDeviceHex =
  'b65b3f96cee7bd97e7df750804bcbabf2bbbe9ced32b9fad45bea396';

test.skip('signDataLE', async () => {
  const privateKeyBuffer = await readFile(privateKeyPath);
  const signature = signDataLE(Buffer.from('The Love Boat'), privateKeyBuffer);
  expect(signature.byteLength).toBe(64);
});

test('sign', async () => {
  const privateKeyBuffer = await readFile(privateKeyPath);
  const signature = sign(null, Buffer.from('The Love Boat'), {
    key: privateKeyBuffer,
    dsaEncoding: 'ieee-p1363',
  });
  expect(signature.byteLength).toBe(64);
});

test('key remake', async () => {
  const exchange = createECDH('secp224r1');
  exchange.setPrivateKey(privateKeyDeviceBuffer);
  const privateKey = exchange.getPrivateKey();
  expect(privateKeyDeviceBuffer).toStrictEqual(privateKey);
});

test('key match', async () => {
  const publicKey = getAdvertisementKey(privateKeyDeviceBuffer);
  expect(publicKey.byteLength).toBe(28);
  expect(publicKey).toStrictEqual(Buffer.from(publicKeyDeviceHex, 'hex'));
});

test('key length', async () => {
  const exchange = createECDH('secp224r1');
  exchange.generateKeys();
  const privateKey = exchange.getPrivateKey();
  expect(privateKey.length).toBe(28);
  const publicKey = exchange.getPublicKey(null, 'compressed');
  expect(publicKey.length).toBe(29);
});

test('key works', async () => {
  const exchange = createECDH('secp224r1');
  exchange.setPrivateKey(privateKeyDeviceBuffer);
  const publicKey = exchange.getPublicKey(null, 'compressed');
  expect(publicKey.length).toBe(29);
});

test('sign & verify', async () => {
  const privateKeyBuffer = await readFile(privateKeyPath);
  const privateKey = createPrivateKey(privateKeyBuffer);
  const publicKey = createPublicKey(privateKey);
  const data = Buffer.from('The Love Boat');
  const dataBad = Buffer.from('The sunk Boat');
  const signature = signDataLE(data, privateKeyBuffer);
  expect(signature.length).toBe(64);
  expect(await validateSignature(data, endianSwap(signature), publicKey)).toBe(
    true,
  );
  expect(
    await validateSignature(dataBad, endianSwap(signature), publicKey),
  ).toBe(false);
});
