/// <reference types="node" />
/// <reference types="node" />
import type { KeyObject } from 'node:crypto';
import { Buffer } from 'node:buffer';
type PacketProps = {
    firmware: Buffer;
    pattern: string;
    privateKey: KeyObject;
    privateKeyForAccessory?: Buffer;
};
export default function makePacket({ firmware, pattern, privateKey, privateKeyForAccessory, }: PacketProps): {
    manifest: Readonly<{
        manifest: {
            application: {
                bin_file: string;
                dat_file: string;
            };
        };
    }>;
    initPacket: Buffer;
    firmwarePatched: Buffer;
};
export {};
