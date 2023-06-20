import { access, unlink } from "node:fs/promises";
import { join } from "node:path";

export const remove = async (path) => {
  try {
    const fileToRemove = join(path);
    await access(fileToRemove);
    await unlink(fileToRemove);
  } catch (error) {
    throw new Error(error.message);
  }

  // Write your code here
};
