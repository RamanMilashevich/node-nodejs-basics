import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const read = async () => {
  const filePath = join(process.cwd(), 'src', 'fs', 'files', 'fileToRead.txt');
  
  try {
    // let's make sure the file exists before trying to read it
    await access(filePath);
    // perfect! the file exists, so let's read its content
    const content = await readFile(filePath, 'utf8');
    console.log(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // the file doesn't exist, so we can't read it
      throw new Error('FS operation failed');
    }
    // some other error occurred while trying to access the file
    throw new Error('FS operation failed');
  }
};

await read();
