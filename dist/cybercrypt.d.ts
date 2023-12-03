/// <reference types="node" />
/// <reference types="node" />
import type { KeyObject } from 'node:crypto';
export declare function validateSignature(data: Buffer, signature: Buffer, publicKey: KeyObject): Promise<boolean>;
