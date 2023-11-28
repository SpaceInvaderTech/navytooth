import { PassThrough } from 'node:stream';
import archiver from 'archiver';

type File = {
  data: Buffer;
  name: string;
};

export default function createZipBuffer(files: File[]) {
  return new Promise<Buffer>((resolve, reject) => {
    const bufferStream = new PassThrough();
    const body: Uint8Array[] = [];
    bufferStream.on('data', (chunk: Uint8Array) => {
      body.push(chunk);
    });
    const archive = archiver('zip');
    archive.on('warning', console.warn);
    archive.on('error', reject);
    archive.on('end', () => resolve(Buffer.concat(body)));
    archive.pipe(bufferStream);
    for (const { data, name } of files) {
      archive.append(data, { name });
    }
    archive.finalize();
  });
}
