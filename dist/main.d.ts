/// <reference types="node" />
import { Buffer } from 'node:buffer';
type PacketProps = {
    firmware: Buffer;
    pattern: string;
    privateKey: Buffer;
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
