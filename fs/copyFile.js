import { createReadStream, createWriteStream } from "node:fs";
import { join, parse } from "node:path";
export const copyFile = async (sourcePath, destination) => {
  try {
    return new Promise((resolve, reject) => {
      const { base } = parse(sourcePath);
      const destinationPath = join(destination, base);
      const sourceStream = createReadStream(sourcePath);
      const destinationStream = createWriteStream(destinationPath);
      sourceStream.on("error", (error) => {
        reject(error);
      });

      destinationStream.on("error", (error) => {
        reject(error);
      });

      destinationStream.on("finish", () => {
        resolve();
      });

      sourceStream.pipe(destinationStream);
    });
  } catch (error) {
    throw new Error(error.messagea);
  }
};
