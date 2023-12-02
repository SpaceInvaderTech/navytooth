/// <reference types="node" />
import { Buffer } from 'node:buffer';
type PacketProps = {
    firmware: Buffer;
    privateKey: Buffer;
    pattern?: string;
};
export default function makePacket({ firmware, privateKey, pattern, }: PacketProps): {
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
