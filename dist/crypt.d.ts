/// <reference types="node" />
/// <reference types="node" />
import { Buffer } from 'node:buffer';
import type { KeyObject } from 'node:crypto';
export declare function makePrivateKey(): Buffer;
export declare function getAdvertisementKey(privateKey: Buffer): Buffer;
export declare function hashLE(data: Uint8Array): Buffer;
export declare function endianSwap(signature: Uint8Array): Buffer;
export declare function signDataLE(data: Uint8Array, key: KeyObject): Buffer;
