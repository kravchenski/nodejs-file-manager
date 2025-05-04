import * as readline from "node:readline"
import FileManager from "./file-manager/main.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const copy = async () => {
    const userName = process.env.npm_config_username ?? "Anonym";
    var filemanager = new FileManager(userName, rl)

    filemanager.getStarted()
    rl.on("line", (input) => {
        filemanager.getCommands(input)
    })
    rl.on("close", () => {
        console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
        process.exit(0);
    })


}
await copy();