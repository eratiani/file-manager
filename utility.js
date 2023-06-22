import home from "./home.js";
import { join, isAbsolute } from "node:path";
export const checkPath = async (path) => {
  if (isAbsolute(path)) {
    return path;
  } else {
    return join(home.value, path);
  }
};
