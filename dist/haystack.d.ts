/// <reference types="node" />
import { Buffer } from 'node:buffer';
export declare function patchFirmware(firmware: Buffer, pattern: string, publicKey: Buffer): Buffer;
