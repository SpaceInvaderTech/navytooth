/// <reference types="node" />
import { Buffer } from 'node:buffer';
export declare function makePrivateKey(): Buffer;
export declare function getAdvertisementKey(privateKey: Buffer): Buffer;
export declare function hashFirmware(firmwarePatched: Buffer): Buffer;
export declare function endianSwap(data: Uint8Array): Buffer;
export declare function signData(data: Uint8Array, privateKey: Buffer): Buffer;
