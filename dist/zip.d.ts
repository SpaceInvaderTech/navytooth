/// <reference types="node" />
type File = {
    data: Uint8Array;
    name: string;
};
export default function createZipBuffer(files: File[]): Promise<Buffer>;
export {};
