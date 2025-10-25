import { createReadStream, createWriteStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';

const decompress = async () => {
  const sourcePath = join(process.cwd(), 'src', 'zip', 'files', 'archive.gz');
  const destPath = join(process.cwd(), 'src', 'zip', 'files', 'fileToCompress.txt');
  
  // let's set up our streams for decompression
  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(destPath);
  const gunzipStream = createGunzip();
  
  // now let's pipe everything together to decompress the file
  await pipeline(readStream, gunzipStream, writeStream);
};

await decompress();
