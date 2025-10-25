import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const calculateHash = async () => {
  const filePath = join(process.cwd(), 'src', 'hash', 'files', 'fileToCalculateHashFor.txt');
  
  // let's create a sha256 hash calculator
  const hash = createHash('sha256');
  const stream = createReadStream(filePath);
  
  // when we get data chunks, let's update the hash
  stream.on('data', (chunk) => {
    hash.update(chunk);
  });
  
  // when we're done reading, let's print the final hash
  stream.on('end', () => {
    console.log(hash.digest('hex'));
  });
  
  // if something goes wrong, let's throw the error
  stream.on('error', (error) => {
    throw error;
  });
};

await calculateHash();
