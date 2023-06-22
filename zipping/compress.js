import { join, parse } from "path";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress } from "zlib";

export const compress = async (sourcePath, targetPath) => {
  try {
    const { name } = parse(sourcePath);
    const compressedFIleName = name + ".br";
    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(join(targetPath, compressedFIleName));
    const brotli = createBrotliCompress();
    readStream.pipe(brotli).pipe(writeStream);
  } catch (error) {
    throw new Error(error.message);
  }
  // Write your code here
};
