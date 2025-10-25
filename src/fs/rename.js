import { rename as fsRename, access } from 'node:fs/promises';
import { join } from 'node:path';

const rename = async () => {
  const sourcePath = join(process.cwd(), 'src', 'fs', 'files', 'wrongFilename.txt');
  const destPath = join(process.cwd(), 'src', 'fs', 'files', 'properFilename.md');
  
  try {
    // first, let's verify the source file exists
    await access(sourcePath);
    
    // now check if the destination file already exists
    try {
      await access(destPath);
      // uh oh! the destination file already exists, we can't rename
      throw new Error('FS operation failed');
    } catch (error) {
      if (error.code === 'ENOENT') {
        // great! the destination doesn't exist, so we can safely rename
        await fsRename(sourcePath, destPath);
      } else {
        // something unexpected happened
        throw new Error('FS operation failed');
      }
    }
  } catch (error) {
    if (error.message === 'FS operation failed') {
      throw error;
    }
    // the source file doesn't exist or some other error occurred
    throw new Error('FS operation failed');
  }
};

await rename();
