import * as readline from "node:readline/promises";
import {
  stdin as input,
  stdout as output,
  argv as inputArgs,
} from "node:process";
import os from "os";
import home from "./home.js";
import { changeDirectory } from "./changeDir.js";
import { sortList as list } from "./sort-list.js";
import { read as readFile } from "./fs/read.js";
import { create as createFile } from "./fs/create.js";
import { rename as renameFile } from "./fs/rename.js";
import { copy as copyFile } from "./fs/copy.js";
import { remove as deleteFile } from "./fs/delete.js";
import { compress } from "./zipping/compress.js";
import { decompress } from "./zipping/decompress.js";
import { calculateHash } from "./hash/calcHash.js";
import { checkPath } from "./utility.js";
import { join } from "node:path";
import { commands } from "./commands.js";
const rl = readline.createInterface({ input, output });

const args = inputArgs.slice(2);

console.log("home is", home.value);

const userNmae = args[0].split("=")[1];
console.log(`Welcome to the File Manager, ${userNmae}!`);
console.log("press help to see all the commands!");

async function handleInput() {
  while (true) {
    const answer = await rl.question(`You are currently in ${home.value} `);
    const fullAnswer = answer.split(" ");
    if (answer === "ls") {
      await list();
    } else if (answer === "stop") {
      break;
    } else if (answer.startsWith("cd")) {
      const path = answer.slice(3);
      changeDirectory(path);
    } else if (answer === "up") {
      changeDirectory("../");
    } else if (answer.startsWith("cat")) {
      try {
        const path = await checkPath(fullAnswer[1]);
        await readFile(path);
      } catch (error) {
        console.log(error.message);
      }
    } else if (answer.startsWith("rn")) {
      try {
        const path1 = await checkPath(fullAnswer[1]);
        const path2 = await checkPath(fullAnswer[2]);
        await renameFile(path1, path2);
      } catch (error) {
        console.log(error.message);
      }
    } else if (answer.startsWith("rm")) {
      try {
        const path = await checkPath(fullAnswer[1]);
        await deleteFile(path);
      } catch (error) {
        console.log(error.message);
      }
    } else if (answer.startsWith("mv")) {
      try {
        const path1 = await checkPath(fullAnswer[1]);
        const path2 = await checkPath(fullAnswer[2]);
        console.log(path1, path2);
        await copyFile(path1, path2);
        await deleteFile(path1);
      } catch (error) {
        console.log(error.message);
      }
    } else if (answer.startsWith("cp")) {
      try {
        const path1 = await checkPath(fullAnswer[1]);
        const path2 = await checkPath(fullAnswer[2]);
        await copyFile(path1, path2);
      } catch (error) {
        console.log(error.message);
      }
    } else if (answer.startsWith("add")) {
      try {
        const path = await checkPath(fullAnswer[1]);
        await createFile(path);
      } catch (error) {
        console.log(error.message);
      }
    } else if (answer === "help") {
      for (const [command, value] of Object.entries(commands)) {
        console.log(`${command}: ${value}`);
      }
    } else if (answer.startsWith("os")) {
      const path = answer.split(" ");
      switch (path[1].slice(2).toLocaleLowerCase()) {
        case "eol":
          const eol = os.EOL;
          console.log("EOL:", JSON.stringify(eol));
          break;
        case "cpus":
          const cpus = os.cpus();
          console.log("CPUs:");
          cpus.forEach((cpu, index) => {
            console.log(`CPU ${index + 1}:`);
            console.log(`Model: ${cpu.model}`);
            console.log(`Clock Rate: ${cpu.speed / 1000} GHz`);
          });
          break;
        case "homedir":
          const homedir = os.homedir();
          console.log("Home Directory:", homedir);
          break;
        case "username":
          const username = os.userInfo().username;
          console.log("Current User Name:", username);
          break;
        case "architecture":
          const architecture = os.arch();
          console.log("CPU Architecture:", architecture);
          break;
      }
    } else if (answer.startsWith("hash")) {
      try {
        const path = await checkPath(fullAnswer[1]);
        await calculateHash(path);
      } catch (error) {
        console.log(error.message);
      }
    } else if (answer.startsWith("compress")) {
      try {
        const path1 = await checkPath(fullAnswer[1]);
        const path2 = await checkPath(fullAnswer[2]);
        await compress(path1, path2);
      } catch (error) {
        console.log(error.message);
      }
    } else if (answer.startsWith("decompress")) {
      try {
        const path1 = await checkPath(fullAnswer[1]);
        const path2 = await checkPath(fullAnswer[2]);
        await decompress(path1, path2);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      console.log("Invalid input");
    }
  }
  console.log(`Thank you for using File Manager, ${userNmae}, goodbye!`);
  rl.close();
}

handleInput();
