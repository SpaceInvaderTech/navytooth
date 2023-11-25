import { get as httpsGet } from 'node:https';

export default function get(url: string | URL) {
  return new Promise<Buffer>((resolve, reject) => {
    const req = httpsGet(url, (res) => {
      const data: Uint8Array[] = [];
      res.on('data', (chunk) => {
        data.push(chunk);
      });
      res.on('end', () => {
        resolve(Buffer.concat(data));
      });
    });
    req.on('error', reject);
  });
}
