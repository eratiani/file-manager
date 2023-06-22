import { createHash } from "crypto";
import { read } from "../fs/read.js";

export const calculateHash = async (path) => {
  const fileContent = await read(path);
  console.log(path);
  const hash = createHash("sha256").update(`${fileContent}`).digest("hex");
  console.log(hash);
  // Write your code here
};
