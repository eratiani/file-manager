import { access, readFile } from "node:fs/promises";
export const read = async (path) => {
  try {
    await access(path);

    const res = await readFile(path);
    console.log(res.toString());
    return res.toString();
  } catch (error) {
    throw new Error("FS operation failed");
  }
};
