import { access } from "node:fs/promises";
import { rename as renameFile } from "node:fs";
import { join } from "node:path";

export const rename = async (path, filename, newFileName) => {
  const oldPath = join(path, filename);
  const newPath = join(path, newFileName);
  const errMsg = "FS operation failed";
  try {
    await access(oldPath);
    renameFile(oldPath, newPath, (error) => {
      if (error) {
        console.error("File rename failed:", error);
        return;
      }
    });
  } catch (error) {
    throw new Error(errMsg);
  }
  // Write your code here
};
