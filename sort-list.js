import { list, structure } from "./list.js";
import home from "./home.js";

export const sortList = async (path) => {
await list(home.value);

structure.sortedDirectories.forEach(dir => {
    console.log(`[directory] ${dir}`);
});
structure.sortedFiles.forEach(file => {
    console.log(`[file] ${file}`);
});
}