/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { test } from 'bun:test';
import { readFile, writeFile } from 'node:fs/promises';
import makePacket from '../src/main';
import createZipBuffer from '../src/zip';

const firmwarePath =
  '../openhaystack/OpenHaystack/OpenHaystack/HaystackApp/Firmwares/Moko/nrf52810_xxaa.bin';
const pattern = 'OFFLINEFINDINGPUBLICKEYHERE!';
const privateKeyPath = '../private.key';

test('makePacket', async () => {
  const firmware = await readFile(firmwarePath);
  const privateKey = await readFile(privateKeyPath);
  const { manifest, initPacket, firmwarePatched } = makePacket({
    firmware,
    pattern,
    privateKey,
  });
  const zipBuffer = await createZipBuffer([
    { data: Buffer.from(JSON.stringify(manifest)), name: 'manifest.json' },
    { data: initPacket, name: manifest.manifest.application.dat_file },
    { data: firmwarePatched, name: manifest.manifest.application.bin_file },
  ]);
  console.log(zipBuffer.length);
  await writeFile('firmware.zip', zipBuffer);
});
