import path from 'node:path';
import { release, version } from 'node:os';
import { createServer as createServerHttp } from 'node:http';
import { fileURLToPath } from 'node:url';

// Import the c.cjs file (we'll need to handle this differently in ESM)
import('./files/c.cjs');

const random = Math.random();

// In ESM, we need to use dynamic imports for JSON files
const unknownObject = random > 0.5 
  ? await import('./files/a.json', { assert: { type: 'json' } })
  : await import('./files/b.json', { assert: { type: 'json' } });

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

// In ESM, we need to use import.meta.url instead of __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject.default);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

// In ESM, we export using export syntax
export {
  unknownObject,
  myServer,
};
