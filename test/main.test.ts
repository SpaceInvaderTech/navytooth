import { test, expect } from 'bun:test';
import { readFile, writeFile } from 'node:fs/promises';
import makePacket from '../src/main';
import createZipBuffer from './zip';

const firmwarePath =
  '../openhaystack/OpenHaystack/OpenHaystack/HaystackApp/Firmwares/Moko/nrf52810_xxaa.bin';
const privateKeyPath = '../private.pem';

test('makePacket & zip', async () => {
  const firmware = await readFile(firmwarePath);
  const privateKey = await readFile(privateKeyPath);
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
