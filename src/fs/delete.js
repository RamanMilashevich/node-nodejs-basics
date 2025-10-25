import { unlink, access } from 'node:fs/promises';
import { join } from 'node:path';

const remove = async () => {
  const filePath = join(process.cwd(), 'src', 'fs', 'files', 'fileToRemove.txt');
  
  try {
    // let's make sure the file exists before trying to delete it
    await access(filePath);
    // perfect! the file exists, so we can safely delete it
    await unlink(filePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // the file doesn't exist, so we can't delete it
      throw new Error('FS operation failed');
    }
    // some other error occurred while trying to access the file
    throw new Error('FS operation failed');
  }
};

await remove();
