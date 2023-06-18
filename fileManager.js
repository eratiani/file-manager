import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output , argv as inputArgs } from 'node:process';
import { home } from "./home.js";
import { sortList as list } from "./sort-list.js";
const rl = readline.createInterface({ input, output });

const args = inputArgs.slice(2);

console.log("home is",home);

const userNmae = args[0].split('=')[1]
console.log(`Welcome to the File Manager, ${userNmae}!`);
const answer = await rl.question('What do you think of Node.js? ');
if (answer === 'list') {
    await list()
    await rl.question('What else?');
}
console.log(`Thank you for your valuable feedback: ${answer}`);

rl.close();