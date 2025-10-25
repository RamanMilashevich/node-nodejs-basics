import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';

const compress = async () => {
  const sourcePath = join(process.cwd(), 'src', 'zip', 'files', 'fileToCompress.txt');
  const destPath = join(process.cwd(), 'src', 'zip', 'files', 'archive.gz');
  
  // let's set up our streams for compression
  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(destPath);
  const gzipStream = createGzip();
  
  // now let's pipe everything together to compress the file
  await pipeline(readStream, gzipStream, writeStream);
};

await compress();
