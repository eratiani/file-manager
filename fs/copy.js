import { access, cp, lstat } from "node:fs/promises";
import { join, parse } from "node:path";
import { copyFile } from "./copyFile.js";
export const copy = async (failname, newPath) => {
  try {
    const first = join(failname);
    const second = join(newPath);
    await access(first);
    const stats = await lstat(first);
    if (stats.isFile()) {
      await copyFile(first, second);
    } else if (stats.isDirectory()) {
      const { base } = parse(failname);
      await cp(first, join(second, base), { recursive: true });
    }
  } catch (error) {
    throw new Error(error.message);
  }

  // Write your code here
};
