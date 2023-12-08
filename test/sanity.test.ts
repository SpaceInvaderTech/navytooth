import { describe, test, expect } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { getAdvertisementKey, hashLE } from '../src/crypt';

const firmwarePath = './test/EA140CF93E0D/firmware.bin';
// const privateKeyPath = '../private.pem';

describe('Node vs Python', () => {
  test('keys', () => {
    // from plist for EA140CF93E0D
    const privateKeyBuffer = Buffer.from(
      'bwaa+RfcHRvgbfwjBRKBuHVAW2wEHlrlPNpvDw==',
      'base64',
    );
    // from test.py
    const advertisementKeyMatch = Buffer.from(
      '02b65b3f96cee7bd97e7df750804bcbabf2bbbe9ced32b9fad45bea396',
      'hex',
    ).subarray(1);
    const advertisementKey = getAdvertisementKey(privateKeyBuffer);
    expect(advertisementKey.byteLength).toBe(28);
    expect(advertisementKeyMatch.byteLength).toBe(28);
    expect(advertisementKey).toStrictEqual(advertisementKeyMatch);
  });

  test.skip('hash', async () => {
    const firmware = await readFile(firmwarePath);
    const firmwareHash = hashLE(firmware).toString('hex');
    // from test.py or nrfutil pkg display
    const hashMatch =
      '4d67ba795ad5e543f1495443c966eb624a7531a890903df4da0c779ccf5afd3c';
    expect(firmwareHash).toBe(hashMatch);
  });
});
