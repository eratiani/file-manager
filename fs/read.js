import { access, readFile } from "node:fs/promises";
import { join } from "node:path";

export const read = async (path) => {
  try {
    await access(path);

    const res = await readFile(path);
    console.log(res.toString());
  } catch (error) {
    throw new Error("FS operation failed");
  }
};
