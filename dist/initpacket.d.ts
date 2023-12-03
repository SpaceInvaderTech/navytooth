/// <reference types="node" />
import { Buffer } from 'node:buffer';
import { dfu } from './protobuf/dfu';
type InitCommandParameters = NonNullable<Parameters<typeof dfu.InitCommand.create>[0]>;
type MakeInitPacket = Pick<InitCommandParameters, 'appSize' | 'fwVersion' | 'hwVersion' | 'sdReq' | 'isDebug'> & {
    privateKey: Buffer;
    firmwareHash: NonNullable<InitCommandParameters['hash']>['hash'];
    verify?: boolean;
};
export default function makeInitPacket({ firmwareHash, // hash of the firmware
appSize, // application size
privateKey, // private key for signing
fwVersion, // firmware version
hwVersion, // required hardware version
sdReq, // Allowed versions of the SoftDevice
isDebug, // whether the firmware is a debug build
verify, }: MakeInitPacket): Uint8Array;
export {};
