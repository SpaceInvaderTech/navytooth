import { test, expect } from 'bun:test';
import { readFile, writeFile } from 'node:fs/promises';
import { createPrivateKey } from 'node:crypto';
import makePacket from '../src/main';
import createZipBuffer from './zip';

const firmwarePath = './test/nrf52810_xxaa.bin';
// nrfutil keys generate
const privateKeyPath = '../private.pem';

test('makePacket & zip', async () => {
  const firmware = await readFile(firmwarePath);
  const privateKeyBuffer = await readFile(privateKeyPath);
  const privateKey = createPrivateKey(privateKeyBuffer);
  const { manifest, initPacket, firmwarePatched } = makePacket({
    firmware,
    privateKey,
  });
  expect(initPacket.length).toBeTruthy();
  const zipBuffer = await createZipBuffer([
    { data: Buffer.from(JSON.stringify(manifest)), name: 'manifest.json' },
    { data: initPacket, name: manifest.manifest.application.dat_file },
    { data: firmwarePatched, name: manifest.manifest.application.bin_file },
  ]);
  expect(zipBuffer.length).toBeTruthy();
  // zip
  const zipFilePath = 'firmware.zip';
  await writeFile(zipFilePath, zipBuffer);
  console.log('Created', zipFilePath);
});
