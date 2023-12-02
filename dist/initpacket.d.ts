/// <reference types="node" />
import { Buffer } from 'node:buffer';
type InitPacket = {
    firmwareHash: Buffer;
    appSize: number;
    privateKey: Buffer;
};
export default function makeInitPacket({ firmwareHash, appSize, privateKey, }: InitPacket): Uint8Array;
export {};
