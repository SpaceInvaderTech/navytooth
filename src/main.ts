import type { Buffer } from 'node:buffer';
import { getAdvertisementKey, hashLE, makePrivateKey } from './crypt';
import { patchFirmware } from './haystack';
import makeInitPacket, { type MakeInitPacketProps } from './initpacket';
import manifest from './manifest.json';

type InitPacketProps = Omit<MakeInitPacketProps, 'firmwareHash' | 'appSize'>;

export type MakePacketProps = InitPacketProps & {
  firmware: Buffer;
  pattern?: string;
};

export default function makePacket({
  firmware,
  pattern,
  privateKey,
  fwVersion,
  hwVersion,
  sdReq,
  verify,
  isDebug,
}: MakePacketProps) {
  const privateKeyForAccessory = makePrivateKey();
  const publicKeyForAccessory = getAdvertisementKey(privateKeyForAccessory);
  const firmwarePatched = patchFirmware(
    firmware,
    publicKeyForAccessory,
    pattern,
  );
  const appSize = firmwarePatched.byteLength;
  const firmwareHash = hashLE(firmwarePatched);
  const initPacket = makeInitPacket({
    firmwareHash,
    appSize,
    privateKey,
    fwVersion,
    hwVersion,
    sdReq,
    verify,
    isDebug,
  });
  return {
    manifest,
    initPacket,
    firmwarePatched,
    privateKeyForAccessory,
  };
}
