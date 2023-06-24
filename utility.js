import home from "./home.js";
import { join, isAbsolute } from "node:path";
export const checkPath = async (path) => {
  try {
    if (isAbsolute(path)) {
      return path;
    } else {
      return join(home.value, path);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
export let extention = { value: "fileURLToPath.txt" };
