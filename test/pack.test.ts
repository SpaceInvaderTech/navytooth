import { test, describe, expect } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { createPrivateKey } from 'node:crypto';
import makePacket from '../src/main';
import { packetValidate } from '../src/packet-validate';

const firmwarePath = './test/nrf52810_xxaa.bin';
const privateKeyPath = '../private.pem';

describe('signature', () => {
  test('sign & verify: EA140CF93E0D', async () => {
    const privateKeyBuffer = await readFile(privateKeyPath);
    const privateKey = createPrivateKey(privateKeyBuffer);
    const firmware = await readFile(firmwarePath);
    const { initPacket } = makePacket({
      firmware,
      privateKey,
    });
    const packetValid = await packetValidate(initPacket, privateKey);
    expect(packetValid).toBe(true);
  });
});

describe.todo('hash', () => {});
