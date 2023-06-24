import { join, parse } from "path";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress } from "zlib";
import { extention } from "../utility.js";
export const compress = async (sourcePath, targetPath) => {
  try {
    const { name, base } = parse(sourcePath);
    const compressedFIleName = name + ".br";
    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(join(targetPath, compressedFIleName));
    const brotli = createBrotliCompress();
    extention.value = base;
    readStream.on("error", (error) => {
      console.log(error.message);
    });

    readStream.pipe(brotli).pipe(writeStream);
    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });
  } catch (error) {
    throw new Error(error.message);
  }
  // Write your code here
};
