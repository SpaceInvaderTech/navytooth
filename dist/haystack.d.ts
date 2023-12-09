/// <reference types="node" />
import { Buffer } from 'node:buffer';
export declare function patchFirmware(firmware: Buffer, publicKey: Buffer, pattern?: string): Buffer;
