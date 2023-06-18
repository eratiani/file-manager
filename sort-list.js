import { list, structure } from "./list.js";
import { home } from "./home.js";

export const sortList = async (path) => {
await list(home);
structure.sortedFiles.forEach(file => {
    console.log(`[file] ${file}`);
});
structure.sortedDirectories.forEach(dir => {
    console.log(`[directory] ${dir}`);
});
}