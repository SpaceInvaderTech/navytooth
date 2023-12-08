import { test, describe, expect } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { hashLE } from '../src/crypt';
import { verifyHash, verifyDataFromPacket } from '../src/ecdsa';
import { makeInitPacket } from '../src/dfu';
import makePacket from '../src/main';
import { packetValidate } from '../src/packet-validate';

const firmwareWorksPath = './test/EA140CF93E0D/firmware.bin';
const initPacketWorksPath = './test/EA140CF93E0D/initpacket.dat';
const firmwareHomemadePath = './test/homemade/firmware.bin';
const initPacketHomemadePath = './test/homemade/initpacket.dat';
// const firmwarePath = './test/nrf52810_xxaa.bin';
const privateKeyPath = '../private.pem';

describe('signature', () => {
  test('sign & verify: EA140CF93E0D', async () => {
    const privateKeyBuffer = await readFile(privateKeyPath);
    const firmware = await readFile(firmwareWorksPath);
    const initPacket1 = makeInitPacket(firmware, privateKeyBuffer);
    expect(verifyHash(initPacket1, hashLE(firmware))).toBe(true);
    const packetValid = await packetValidate(initPacket1, privateKeyBuffer);
    // console.log(packetValid);
    expect(packetValid).toBe(true);
    const packetValid2 = verifyDataFromPacket(initPacket1, privateKeyBuffer);
    // console.log(packetValid2);
    expect(packetValid2).toBe(true);
    const { initPacket } = makePacket({
      firmware,
      privateKey: privateKeyBuffer,
    });
    expect(verifyHash(initPacket, hashLE(firmware))).toBe(true);
    const packetValid3 = await packetValidate(initPacket, privateKeyBuffer);
    // console.log(packetValid3);
    expect(packetValid3).toBe(true);
    // console.log(dfu.SignedCommand.decode(initPacket).toJSON());
    // console.log(dfu.Packet.decode(initPacket).toJSON());
    // console.log(
    //   '!work',
    //   Buffer.from(initPacket).toString('hex'),
    //   initPacket.length,
    // );
    // const firmwareHash = hashLE(firmware);
    // const isValidHash = verifyHash(initPacket, firmwareHash);
    // expect(isValidHash).toBe(true);
    // const isValidSignature = verifyData(
    //   Buffer.from(initPacket),
    //   privateKeyBuffer,
    // );
    // expect(isValidSignature).toBe(true);
  });
});

describe('hash', () => {
  test('packet that works', async () => {
    const firmware = await readFile(firmwareWorksPath);
    const initPacket = await readFile(initPacketWorksPath);
    const initPacketFirmwareHash = initPacket.subarray(33, 33 + 32);
    const firmwareHash = hashLE(firmware);
    expect(initPacketFirmwareHash).toEqual(firmwareHash);
  });
  test.skip('packet homemade', async () => {
    const firmware = await readFile(firmwareHomemadePath);
    const initPacket = await readFile(initPacketHomemadePath);
    const initPacketFirmwareHash = initPacket.subarray(33, 33 + 32);
    const firmwareHash = hashLE(firmware);
    expect(initPacketFirmwareHash).toEqual(firmwareHash);
  });
});
