/// <reference types="node" />
import { Buffer } from 'node:buffer';
export default function makeInitPacket(firmwareHash: Buffer, appSize: number, privateKey: Buffer): Buffer;
