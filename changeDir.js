import path from "path";
import { accessSync } from "fs";
import home from "./home.js";
export function changeDirectory(pathToDirectory) {
  let targetPath = path.resolve(home.value, pathToDirectory);

  try {
    accessSync(targetPath);
    process.chdir(targetPath);
    home.value = targetPath;
  } catch (error) {
    console.error(`Failed to change directory: ${error}`);
  }
}
