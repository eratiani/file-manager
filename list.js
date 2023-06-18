import { access, lstat, readdir } from 'node:fs/promises';
import { join } from 'node:path';
export const structure = {}
export const list = async (path) => {
  try {
    const files = [];
    const directories = [];
    const dirPath = join(path);
    await access(dirPath);
    const fileNames = await readdir(dirPath);

    for (const file of fileNames) {
      const stats = await lstat(join(dirPath, file));

      if (stats.isFile()) {
        files.push(file);
      } else if(stats.isDirectory()) {
        directories.push(file);
      }
    }

const sortedFiles = files.sort();
const sortedDirectories = directories.sort();
structure.sortedFiles = sortedFiles;
structure.sortedDirectories = sortedDirectories;
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

// Example usage:
list('.');
