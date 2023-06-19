import { access, cp } from "node:fs/promises";
import { join } from "node:path";

export const copy = async (path, failname, newPath) => {
  const dirPath = join(path, failname);
  const targetPath = join(newPath, failname);
  try {
    await access(targetPath).then(() => {
      throw new Error("FS operation failed");
    });
  } catch (error) {
    if (error.message !== "FS operation failed") {
      cp(dirPath, targetPath, { recursive: true });
    } else {
      throw new Error(error.message);
    }
  }

  // Write your code here
};

