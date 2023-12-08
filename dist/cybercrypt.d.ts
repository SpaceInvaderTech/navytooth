/// <reference types="node" />
import type { KeyObject } from 'node:crypto';
export declare function validateSignature(data: Uint8Array, signature: Uint8Array, publicKey: KeyObject): Promise<boolean>;
