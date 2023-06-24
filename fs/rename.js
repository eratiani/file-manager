import { access } from "node:fs/promises";
import { rename as renameFile } from "node:fs";

export const rename = async (filename, newFileName) => {
  const errMsg = "FS operation failed";
  try {
    await access(filename);
    renameFile(filename, newFileName, (error) => {
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
