import { join, parse } from "path";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliDecompress } from "zlib";

export const decompress = async (sourcePath, targetPath) => {
  try {
    // const { name } = parse(sourcePath);
    const writeStream = createWriteStream(join(targetPath, "file.txt"));
    const readStream = createReadStream(sourcePath);
    const brotli = createBrotliDecompress();

    readStream.pipe(brotli).pipe(writeStream);
  } catch (error) {
    throw new Error(error.message);
  }
  // Write your code here
};
