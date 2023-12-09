import type { IncomingMessage } from 'node:http';
import type { RequestOptions } from 'node:https';
import { Buffer } from 'node:buffer';
import { Agent, request } from 'node:https';

interface IResult {
  body: Buffer;
  statusCode: IncomingMessage['statusCode'];
}

const httpOptions = {
  agent: new Agent({ keepAlive: true }),
  headers: {
    'User-Agent': `Node/${process.version} tech@spaceinvader.com`,
  },
};

function makeOptions(options: RequestOptions | string) {
  if (typeof options === 'string') {
    const url = new URL(options);
    return makeOptions({
      hostname: url.hostname,
      path: url.pathname + url.search,
    });
  }
  return {
    ...httpOptions,
    ...options,
    headers: {
      ...httpOptions.headers,
      ...options.headers,
    },
  };
}

export function fetch(options: RequestOptions | string): Promise<IResult> {
  return new Promise((resolve, reject) => {
    const req = request(makeOptions(options), (res) => {
      const { statusCode, headers } = res;
      if (statusCode! > 300 && headers.location) {
        return resolve(fetch(headers.location));
      }
      const data: Uint8Array[] = [];
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => {
        const body = Buffer.concat(data);
        const result = { body, statusCode };
        if (statusCode && statusCode >= 200 && statusCode < 300) {
          resolve(result);
        } else {
          reject(new Error(`${statusCode}: ${body.toString()}`));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}
