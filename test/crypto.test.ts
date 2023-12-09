import { test, expect } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { createPrivateKey, createPublicKey } from 'node:crypto';
import { signDataLE, endianSwap } from '../src/crypt';
import { validateSignature } from '../utils/cybercrypt';

// ecdsa-sha2-nistp256
const privateKeyPath = '../private.pem';

test('sign & verify', async () => {
  const privateKeyBuffer = await readFile(privateKeyPath);
  const privateKey = createPrivateKey(privateKeyBuffer);
  const publicKey = createPublicKey(privateKey);
  const data = Buffer.from('The Love Boat');
  const dataBad = Buffer.from('The sunk Boat');
  const signature = signDataLE(data, privateKey);
  expect(signature.length).toBe(64);
  expect(await validateSignature(data, endianSwap(signature), publicKey)).toBe(
    true,
  );
  expect(
    await validateSignature(dataBad, endianSwap(signature), publicKey),
  ).toBe(false);
});
