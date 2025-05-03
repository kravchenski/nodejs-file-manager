import { log } from "node:console";
import { homedir } from "node:os";

import cdCommand from "./COMMANDS/cd.js";
import upCommand from "./COMMANDS/up.js";
import lsCommand from "./COMMANDS/ls.js";
import { cwd } from "node:process";

var currentWorkDirectory = homedir()

export default class FileManager {
    username = String
    constructor(username, rl) {
        this.username = username
        this.rl = rl
    }
    getStarted() {
        log(`Welcome to the File Manager, ${this.username}`);
        log(`You are currently in ${homedir()}`)
    }

    getCommands(command) {
        switch (command) {
            case 'up':
                upCommand(currentWorkDirectory)
                currentWorkDirectory = cwd()
                break;
            case command.startsWith('cd') ? command : null:
                let targetPath = command.trim().slice(2).trim();
                cdCommand(targetPath, currentWorkDirectory)
                currentWorkDirectory = cwd();
                break
            case 'ls':
                lsCommand(currentWorkDirectory)
                break
            case '.exit':
                this.rl.close();
                break
            default:
                log("Invalid input")
                break
        }

    }
}
