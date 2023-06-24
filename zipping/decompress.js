import { join } from "path";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliDecompress } from "zlib";
import { extention } from "../utility.js";
export const decompress = async (sourcePath, targetPath) => {
  try {
    const writeStream = createWriteStream(join(targetPath, extention.value));
    const readStream = createReadStream(sourcePath);
    const brotli = createBrotliDecompress();
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
