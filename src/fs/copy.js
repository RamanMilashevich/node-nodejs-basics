import { cp, access } from 'node:fs/promises';
import { join } from 'node:path';

const copy = async () => {
  const sourcePath = join(process.cwd(), 'src', 'fs', 'files');
  const destPath = join(process.cwd(), 'src', 'fs', 'files_copy');
  
  try {
    // let's make sure the source folder actually exists
    await access(sourcePath);
    
    // now check if the destination folder already exists
    try {
      await access(destPath);
      // oops! the destination already exists, we can't copy
      throw new Error('FS operation failed');
    } catch (error) {
      if (error.code === 'ENOENT') {
        // perfect! the destination doesn't exist, so we can safely copy
        await cp(sourcePath, destPath, { recursive: true });
      } else {
        // something else went wrong
        throw new Error('FS operation failed');
      }
    }
  } catch (error) {
    if (error.message === 'FS operation failed') {
      throw error;
    }
    // the source folder doesn't exist or some other error occurred
    throw new Error('FS operation failed');
  }
};

await copy();
