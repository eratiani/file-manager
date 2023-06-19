import { writeFile } from "node:fs/promises";



export const create = async (path) => {

  try {
    await writeFile(path,"");
  } catch (error) {
      throw new Error("FS operation failed");
  }
};

