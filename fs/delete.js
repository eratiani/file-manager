import { access, unlink, rmdir, lstat } from "node:fs/promises";

export const remove = async (path) => {
  try {
    await access(path);

    const stats = await lstat(path);
    if (stats.isFile()) {
      await unlink(path);
    } else if (stats.isDirectory()) {
      //// did not implement fully as it appears to not be required by task
      await rmdir(path);
    }
  } catch (error) {
    throw new Error(error.message);
  }

  // Write your code hereQA
};
