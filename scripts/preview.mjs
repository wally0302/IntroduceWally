import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, join, normalize, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'out');
const host = '127.0.0.1';
const port = Number.parseInt(process.env.PORT || '3000', 10);

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
};

function safePath(urlPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(urlPath);
  } catch {
    return null;
  }
  const pathname = decoded.split('?')[0].split('#')[0];
  const candidate = resolve(root, `.${normalize(pathname)}`);
  const outside = relative(root, candidate).startsWith('..') || relative(root, candidate).includes(`..${process.platform === 'win32' ? '\\' : '/'}`);
  return outside ? null : candidate;
}

async function findFile(urlPath) {
  const candidate = safePath(urlPath);
  if (!candidate) return null;
  try {
    const info = await stat(candidate);
    if (info.isFile()) return candidate;
    if (info.isDirectory()) {
      const index = join(candidate, 'index.html');
      const indexInfo = await stat(index);
      return indexInfo.isFile() ? index : null;
    }
  } catch {
    return null;
  }
  return null;
}

function send404(response) {
  response.statusCode = 404;
  response.setHeader('Content-Type', 'text/plain; charset=utf-8');
  response.end('404 Not Found\n');
}

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.statusCode = 405;
    response.setHeader('Allow', 'GET, HEAD');
    response.end('Method Not Allowed\n');
    return;
  }

  const urlPath = request.url || '/';
  const file = await findFile(urlPath);
  if (!file) {
    send404(response);
    return;
  }

  try {
    const body = await readFile(file);
    response.statusCode = 200;
    response.setHeader('Content-Type', mimeTypes[extname(file).toLowerCase()] || 'application/octet-stream');
    response.setHeader('Content-Length', body.byteLength);
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    send404(response);
  }
});

server.listen(port, host, () => {
  console.log(`Previewing ${root} at http://${host}:${port}`);
});
