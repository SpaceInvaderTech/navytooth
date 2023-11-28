/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { test } from 'bun:test';
// import { generateKeyPairSync } from 'node:crypto';
// import { createPrivateKey } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { writeFile } from 'node:fs/promises';
import makeAccessory from '../src/accessory';
import makeFirmware from '../src/main';
import createZipBuffer from '../src/zip';

const firmwarePath =
  '../openhaystack/OpenHaystack/OpenHaystack/HaystackApp/Firmwares/Moko/nrf52810_xxaa.bin';
const pattern = 'OFFLINEFINDINGPUBLICKEYHERE!';
const privateKeyPath = '../private.key';
// const privateKeyPath = '/Users/jacob/Downloads/test.pem';
// const { privateKey } = generateKeyPairSync('ec', { namedCurve: 'prime256v1' });

// function keyBufferToKeyObject(key: Buffer) {
//   return createPrivateKey({ key });
// }

test('makeFirmware', async () => {
  const accessory = makeAccessory();
  const firmwareBuffer = await readFile(firmwarePath);
  // const privateKey = keyBufferToKeyObject(await readFile(privateKeyPath));
  const privateKey = await readFile(privateKeyPath);
  const { manifest, initPacket, firmwarePatched } = makeFirmware(
    accessory,
    firmwareBuffer,
    pattern,
    privateKey,
  );
  const zipBuffer = await createZipBuffer([
    { data: manifest, name: 'manifest.json' },
    { data: initPacket, name: 'initpacket.dat' },
    { data: firmwarePatched, name: 'firmware.bin' },
  ]);
  console.log(zipBuffer.length);
  await writeFile('firmware.zip', zipBuffer);
});
