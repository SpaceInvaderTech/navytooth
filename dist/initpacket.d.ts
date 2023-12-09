/// <reference types="node" />
import type { KeyObject } from 'node:crypto';
export type MakeInitPacketProps = {
    privateKey: KeyObject;
    firmwareHash: Uint8Array;
    appSize?: number;
    fwVersion?: number;
    hwVersion?: number;
    sdReq?: number[];
    isDebug?: boolean;
    verify?: boolean;
};
export default function makeInitPacket({ firmwareHash, // hash of the firmware
appSize, // application size
privateKey, // private key for signing
fwVersion, // firmware version
hwVersion, // required hardware version
sdReq, // Allowed versions of the SoftDevice
isDebug, // whether the firmware is a debug build
verify, }: MakeInitPacketProps): Uint8Array;
