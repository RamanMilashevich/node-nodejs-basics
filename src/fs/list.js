import { readdir, access } from 'node:fs/promises';
import { join } from 'node:path';

const list = async () => {
  const dirPath = join(process.cwd(), 'src', 'fs', 'files');
  
  try {
    // first, let's make sure the directory actually exists
    await access(dirPath);
    // great! the directory exists, so let's read all the files in it
    const files = await readdir(dirPath);
    console.log(files);
  } catch (error) {
    // the directory doesn't exist or some other error occurred
    throw new Error('FS operation failed');
  }
};

await list();
