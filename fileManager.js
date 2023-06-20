import * as readline from "node:readline/promises";
import {
  stdin as input,
  stdout as output,
  argv as inputArgs,
} from "node:process";
import home from "./home.js";
import { changeDirectory } from "./changeDir.js";
import { sortList as list } from "./sort-list.js";
import { read as readFile } from "./fs/read.js";
import { create as createFile } from "./fs/create.js";
import { rename as renameFile } from "./fs/rename.js";
import { copy as copyFile } from "./fs/copy.js";
import { remove as deleteFile } from "./fs/delete.js";
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
      const path = answer.slice(4);
      try {
        await readFile(join(home.value, path));
      } catch (error) {
        console.log(error.message);
      }
    } else if (answer.startsWith("rn")) {
      const path = answer.split(" ");
      try {
        await renameFile(home.value, path[1], path[2]);
      } catch (error) {
        console.log(error.message);
      }
    } else if (answer.startsWith("rm")) {
      const path = answer.split(" ");
      try {
        await deleteFile(join(home.value, path[1]));
      } catch (error) {
        console.log(error.message);
      }
    } else if (answer.startsWith("mv")) {
      const path = answer.split(" ");
      try {
        await copyFile(home.value, path[1], path[2]);
        await deleteFile(join(home.value, path[1]));
      } catch (error) {
        console.log(error.message);
      }
    } else if (answer.startsWith("cp")) {
      const path = answer.split(" ");
      try {
        await copyFile(home.value, path[1], path[2]);
      } catch (error) {
        console.log(error.message);
      }
    } else if (answer.startsWith("add")) {
      const path = answer.slice(4);
      try {
        await createFile(join(home.value, path));
      } catch (error) {
        console.log(error.message);
      }
    } else if (answer === "help") {
      for (const [command, value] of Object.entries(commands)) {
        console.log(`${command}: ${value}`);
      }
    } else {
      console.log("Invalid input");
    }
  }
  console.log(`Thank you for using File Manager, ${userNmae}, goodbye!`);
  rl.close();
}

handleInput();
