import { test, expect } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { createECDH, createVerify } from 'node:crypto';
import { getAdvertisementKey, signData } from '../src/crypt';

const privateKeyPath = '../private.pem';

// EA140CF93E0D
// const privateKeyBase64Hex = 'bwaa+RfcHRvgbfwjBRKBuHVAW2wEHlrlPNpvDw==';
const privateKeyDecimal =
  '11692381664088018591973596686274843213708014143318838444472802111247';
const privateKeyBigInt = BigInt(privateKeyDecimal);
const privateKeyBuffer = Buffer.from(privateKeyBigInt.toString(16), 'hex');
const publicKeyHex = 'b65b3f96cee7bd97e7df750804bcbabf2bbbe9ced32b9fad45bea396';

// export function makePEM(key: Buffer) {
//   const regexPattern = new RegExp('.{1,64}', 'g');
//   const keyLines = key.toString('base64').match(regexPattern);
//   if (keyLines === null) throw new Error('Invalid key');
//   return [
//     '-----BEGIN EC PRIVATE KEY-----',
//     ...keyLines,
//     '-----END EC PRIVATE KEY-----',
//   ].join('\n');
// }

// https://github.com/NordicSemiconductor/pc-nrfutil/blob/master/nordicsemi/dfu/signing.py#L103-L119
function verify(initPacket: Buffer, signature: Buffer, privateKey: string) {
  // Create verifier with SHA256
  const verifier = createVerify('SHA256');
  verifier.update(initPacket);
  // Verify signature
  return verifier.verify(privateKey, signature);
}

test('key remake', async () => {
  const exchange = createECDH('secp224r1');
  exchange.setPrivateKey(privateKeyBuffer);
  const privateKey = exchange.getPrivateKey();
  expect(privateKeyBuffer).toStrictEqual(privateKey);
});

test('key match', async () => {
  const publicKey = getAdvertisementKey(privateKeyBuffer);
  expect(publicKey.byteLength).toBe(28);
  expect(publicKey).toStrictEqual(Buffer.from(publicKeyHex, 'hex'));
});

test('key length', async () => {
  const exchange = createECDH('secp224r1');
  exchange.generateKeys();
  const privateKey = exchange.getPrivateKey();
  // console.log(privateKey.toString('hex'));
  expect(privateKey.length).toBe(28);
  const publicKey = exchange.getPublicKey(null, 'compressed');
  expect(publicKey.length).toBe(29);
});

test('key works', async () => {
  const exchange = createECDH('secp224r1');
  exchange.setPrivateKey(privateKeyBuffer);
  const publicKey = exchange.getPublicKey(null, 'compressed');
  expect(publicKey.length).toBe(29);
});

test('sign & verify', async () => {
  const privateKeyBuffer = await readFile(privateKeyPath);
  const data = Buffer.from('The Love Boat');
  const signature = signData(data, privateKeyBuffer);
  expect(signature.length).toBeTruthy();
  expect(verify(data, signature, privateKeyBuffer.toString())).toBe(true);
});
