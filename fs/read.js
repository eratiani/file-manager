import { access, readFile } from "node:fs/promises";
import { join } from "node:path";

export const read = async (path) => {
  try {
    const file = join(path);
    await access(file);

    const res = await readFile(file);
    console.log(res.toString());
  } catch (error) {
    throw new Error("FS operation failed");
  }
};
