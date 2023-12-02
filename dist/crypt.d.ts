/// <reference types="node" />
/// <reference types="node" />
import { Buffer } from 'node:buffer';
import type { BinaryLike } from 'node:crypto';
export declare function makePrivateKey(): Buffer;
export declare function getAdvertisementKey(privateKey: Buffer): Buffer;
export declare function hashFirmware(firmwarePatched: Buffer): Buffer;
export declare function signData(data: BinaryLike, privateKey: Buffer): Buffer;
