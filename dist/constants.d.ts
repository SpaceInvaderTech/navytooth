/// <reference types="node" />
import { Buffer } from 'node:buffer';
export declare const manifest: Readonly<{
    manifest: {
        application: {
            bin_file: string;
            dat_file: string;
        };
    };
}>;
export declare const packet: Readonly<{
    header: Buffer;
    body: Buffer;
    fixedData: Buffer;
}>;
