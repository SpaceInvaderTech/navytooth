import { test, describe, expect } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { createPrivateKey } from 'node:crypto';
import { fetchFirmware } from '../utils/firmware';
import makePacket from '../src/main';
import { packetValidate } from '../utils/packet-validate';

const privateKeyPath = '../private.pem';

describe('signature', () => {
  test('sign & verify: EA140CF93E0D', async () => {
    const privateKeyBuffer = await readFile(privateKeyPath);
    const privateKey = createPrivateKey(privateKeyBuffer);
    const firmware = await fetchFirmware();
    const { initPacket } = makePacket({
      firmware,
      privateKey,
    });
    const packetValid = await packetValidate(initPacket, privateKey);
    expect(packetValid).toBe(true);
  });
});

describe.todo('hash', () => {});
