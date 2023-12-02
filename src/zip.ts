import { PassThrough } from 'node:stream';
import archiver from 'archiver';

type File = {
  data: Uint8Array;
  name: string;
};

export default function createZipBuffer(files: File[]) {
  return new Promise<Buffer>((resolve, reject) => {
    const bufferStream = new PassThrough();
    const body: Uint8Array[] = [];
    bufferStream.on('data', (chunk) => {
      body.push(chunk);
    });
    const archive = archiver('zip');
    archive.on('warning', console.warn);
    archive.on('error', reject);
    archive.on('end', () => resolve(Buffer.concat(body)));
    archive.pipe(bufferStream);
    for (const { data, name } of files) {
      archive.append(Buffer.from(data), { name });
    }
    archive.finalize();
  });
}
