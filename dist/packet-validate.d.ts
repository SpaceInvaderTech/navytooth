/// <reference types="node" />
import type { KeyObject } from 'node:crypto';
export declare function packetValidate(initPacket: Uint8Array, privateKey: KeyObject): Promise<boolean>;
