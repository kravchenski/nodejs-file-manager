import { log } from "node:console";
import { homedir } from "node:os";
import { cwd } from "node:process";

import cdCommand from "./COMMANDS/cd.js";
import upCommand from "./COMMANDS/up.js";
import lsCommand from "./COMMANDS/ls.js";
import catCommand from "./COMMANDS/FILE/read.js";
import addCommand from "./COMMANDS/FILE/add.js";
import makeDirCommand from "./COMMANDS/FILE/mkdir.js";
import renameCommand from "./COMMANDS/FILE/rename.js";
import copyCommand from "./COMMANDS/FILE/copy.js";
import moveCommand from "./COMMANDS/FILE/move.js";
import removeCommand from "./COMMANDS/FILE/remove.js";
import hashCommand from "./COMMANDS/FILE/hash.js";
import compressCommand from "./COMMANDS/FILE/compress.js";
import decompressCommand from "./COMMANDS/FILE/decompress.js";
import osCommandHandler from "./COMMANDS/OS/os.js";

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
                let targetPath = command.trim().slice(3).trim();
                currentWorkDirectory = cdCommand(targetPath, currentWorkDirectory);
                break
            case 'ls':
                lsCommand(currentWorkDirectory)
                break
            case command.startsWith('cat') ? command : null:
                let targetFilePathInCommand = command.trim().slice(4).trim();
                catCommand(targetFilePathInCommand, currentWorkDirectory)
                break
            case command.startsWith('add') ? command : null:
                let targetFilePathInAddCommand = command.trim().slice(4).trim();
                addCommand(targetFilePathInAddCommand, currentWorkDirectory)
                break
            case command.startsWith('mkdir') ? command : null:
                let targetFilePathInDirCommand = command.trim().slice(6).trim();
                makeDirCommand(targetFilePathInDirCommand, currentWorkDirectory)
                break
            case command.startsWith('rn') ? command : null:
                let targetFilePathInRenameCommand = command.trim().slice(3).trim();
                renameCommand(targetFilePathInRenameCommand.split(" ")[0], currentWorkDirectory, targetFilePathInRenameCommand.split(" ")[1])
                break
            case command.startsWith('cp') ? command : null:
                let targetFilePathInCopyCommand = command.trim().slice(2).trim().split(/\s+/);
                copyCommand(targetFilePathInCopyCommand[0], targetFilePathInCopyCommand.slice(1).join(" "))
                break
            case command.startsWith('mv') ? command : null:
                let targetFilePathInMoveCommand = command.trim().slice(2).trim().split(/\s+/);
                moveCommand(targetFilePathInMoveCommand[0], targetFilePathInMoveCommand.slice(1).join(" "))
                break
            case command.startsWith('rm') ? command : null:
                let targetFilePathInRemoveCommand = command.trim().slice(3).trim();
                removeCommand(targetFilePathInRemoveCommand)
                break
            case command.startsWith('hash') ? command : null:
                let targetFilePathInHashCommand = command.trim().slice(5).trim();
                hashCommand(targetFilePathInHashCommand, currentWorkDirectory)
                break
            case command.startsWith('compress') ? command : null:
                let targetFilePathInCompressCommand = command.trim().slice(9).trim().split(/\s+/);
                compressCommand(targetFilePathInCompressCommand[0], currentWorkDirectory, targetFilePathInCompressCommand.slice(1).join(" "))
                break
            case command.startsWith('decompress') ? command : null:
                let targetFilePathInDecompressCommand = command.trim().slice(10).trim().split(/\s+/);
                decompressCommand(targetFilePathInDecompressCommand[0], currentWorkDirectory, targetFilePathInDecompressCommand.slice(1).join(" "))
                break
            case command.startsWith('os') ? command : null:
                let targetFilePathInOsCommand = command.trim().slice(5).trim()
                osCommandHandler(targetFilePathInOsCommand)
                break
            case '.exit':
                this.rl.close();
                break
            default:
                log("Invalid input")
                log(`You are currently in ${currentWorkDirectory}`)
                break
        }

    }
}
