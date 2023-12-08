/// <reference types="node" />
/// <reference types="node" />
import type { Buffer } from 'node:buffer';
import type { KeyObject } from 'node:crypto';
type PacketProps = {
    firmware: Buffer;
    privateKey: KeyObject;
    pattern?: string;
};
export default function makePacket({ firmware, privateKey, pattern, }: PacketProps): {
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
