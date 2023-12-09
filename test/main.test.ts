import { test, expect } from 'bun:test';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve as pathResolve } from 'node:path';
import { createPrivateKey } from 'node:crypto';
import { fetchFirmware } from './utils/firmware';
import makePacket, { type MakePacketProps } from '../src/main';
import createZipBuffer from './utils/zip';

const privateKeyPath = '../private.pem'; // nrfutil keys generate
const zipFilePath = pathResolve(__dirname, 'firmware.zip');
const packetProps: Partial<MakePacketProps> = {
  fwVersion: 1,
  hwVersion: 52,
  sdReq: [0x0103],
  // isDebug: true,
};

test('makePacket & zip', async () => {
  const firmware = await fetchFirmware();
  const privateKeyBuffer = await readFile(privateKeyPath);
  const privateKey = createPrivateKey(privateKeyBuffer);
  const { manifest, initPacket, firmwarePatched } = makePacket({
    ...packetProps,
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
  await writeFile(zipFilePath, zipBuffer);
  console.log('Created', zipFilePath);
});
