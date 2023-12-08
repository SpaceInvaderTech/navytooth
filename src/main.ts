import type { Buffer } from 'node:buffer';
import { getAdvertisementKey, hashLE, makePrivateKey } from './crypt';
import { patchFirmware } from './haystack';
import makeInitPacket from './initpacket';
import manifest from './manifest.json';

type PacketProps = {
  firmware: Buffer;
  privateKey: Buffer;
  pattern?: string;
};

export default function makePacket({
  firmware,
  privateKey,
  pattern = 'OFFLINEFINDINGPUBLICKEYHERE!',
}: PacketProps) {
  const privateKeyForAccessory = makePrivateKey();
  const publicKey = getAdvertisementKey(privateKeyForAccessory);
  const firmwarePatched = patchFirmware(firmware, pattern, publicKey);
  const firmwareHash = hashLE(firmwarePatched);
  const initPacket = makeInitPacket({
    firmwareHash,
    appSize: firmwarePatched.byteLength,
    privateKey,
    verify: true,
  });
  return {
    manifest,
    initPacket,
    firmwarePatched,
    privateKeyForAccessory,
  };
}
