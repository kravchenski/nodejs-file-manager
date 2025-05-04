import { log } from "node:console";
import { access, mkdir, rmdir } from "node:fs"
import { constants } from "node:fs/promises";
import path from "node:path";

export default function makeDirCommand(filePath, currentWorkDirectory) {
    var file = path.join(currentWorkDirectory, filePath)
    access(file, constants.F_OK, (err2) => {
        if (!err2) {
            log("Operation failed")
        }
        mkdir(file, (err) => {
            if (err) return;
            console.log("Folder creates succesfully!");
        })
    })
}
