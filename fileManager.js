import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output , argv as inputArgs } from 'node:process';
import home from "./home.js";
import { changeDirectory } from "./changeDir.js";
import { sortList as list } from "./sort-list.js";
const rl = readline.createInterface({ input, output });

const args = inputArgs.slice(2);

console.log("home is",home.value);

const userNmae = args[0].split('=')[1]
console.log(`Welcome to the File Manager, ${userNmae}!`);
async function handleInput() {
    while (true) {
        
        const answer = await rl.question(`You are currently in ${home.value} `);
        if (answer === 'ls') {
            await list()
        }else if (answer ==="stop") {
            break;
        }else if(answer.startsWith("cd")){
            const path = answer.slice(3);
            changeDirectory(path);
        } else if(answer === "up"){
            changeDirectory("../");
        } else {
            console.log("Invalid input");
        }
    }
    console.log(`Thank you for using File Manager, ${userNmae}, goodbye!`);
    rl.close();
}

handleInput();