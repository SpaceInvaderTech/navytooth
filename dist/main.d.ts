/// <reference types="node" />
import { Buffer } from 'node:buffer';
type PacketProps = {
    firmware: Buffer;
    pattern: string;
    privateKey: Buffer;
};
export default function makePacket({ firmware, pattern, privateKey, }: PacketProps): {
    manifest: Readonly<{
        manifest: {
            application: {
                bin_file: string;
                dat_file: string;
            };
        };
    }>;
    initPacket: Uint8Array;
    firmwarePatched: Buffer;
    privateKeyForAccessory: Buffer;
};
export {};
