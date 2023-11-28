/// <reference types="node" />
type File = {
    data: Buffer;
    name: string;
};
export default function createZipBuffer(files: File[]): Promise<Buffer>;
export {};
