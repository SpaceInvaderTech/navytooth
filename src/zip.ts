import { PassThrough } from 'node:stream';
import archiver from 'archiver';

type File = {
  data: Buffer;
  name: string;
};

export default function createZipBuffer(files: File[]) {
  return new Promise<Buffer>((resolve, reject) => {
    const bufferStream = new PassThrough();
    const data: Uint8Array[] = [];

    bufferStream.on('data', (chunk: Uint8Array) => {
      data.push(chunk);
    });

    const archive = archiver('zip');

    archive.on('warning', console.warn);
    archive.on('error', reject);
    archive.on('end', () => resolve(Buffer.concat(data)));

    archive.pipe(bufferStream);

    // Add file buffers to the archive
    for (const { data, name } of files) {
      archive.append(data, { name });
    }

    // Finalize the archive
    archive.finalize();
  });
}
