import { writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const create = async () => {
  const filePath = join(process.cwd(), 'src', 'fs', 'files', 'fresh.txt');
  
  try {
    // first, let's check if the file already exists
    await access(filePath);
    // if we get here, the file exists, so we should throw an error
    throw new Error('FS operation failed');
  } catch (error) {
    if (error.code === 'ENOENT') {
      // great! the file doesn't exist, so we can safely create it
      try {
        await writeFile(filePath, 'I am fresh and young');
      } catch (writeError) {
        // something went wrong while writing the file
        throw new Error('FS operation failed');
      }
    } else {
      // the file exists or some other error occurred
      throw new Error('FS operation failed');
    }
  }
};

await create();
