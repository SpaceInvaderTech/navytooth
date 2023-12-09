/// <reference types="node" />
import type { Buffer } from 'node:buffer';
import { type MakeInitPacketProps } from './initpacket';
type InitPacketProps = Omit<MakeInitPacketProps, 'firmwareHash' | 'appSize'>;
export type MakePacketProps = InitPacketProps & {
    firmware: Buffer;
    pattern?: string;
};
export default function makePacket({ firmware, pattern, privateKey, fwVersion, hwVersion, sdReq, verify, isDebug, }: MakePacketProps): {
    manifest: {
        manifest: {
            application: {
                bin_file: string;
                dat_file: string;
            };
        };
    };
    initPacket: Uint8Array;
    firmwarePatched: Buffer;
    privateKeyForAccessory: Buffer;
};
export {};
