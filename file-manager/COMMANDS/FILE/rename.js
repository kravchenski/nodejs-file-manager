import { log } from "node:console";
import { access, rename } from "node:fs"
import { constants } from "node:fs/promises";
import path from "node:path";

export default function renameCommand(filePath, currentWorkDirectory, newfilePath) {
    var file = path.join(currentWorkDirectory, filePath)
    var newFile = path.join(currentWorkDirectory, newfilePath)
    access(file, constants.F_OK, (err2) => {
        if (err2) {
            log("Operation failed")
        }
        rename(file, newFile, (err) => {
            if (err) return;
            else {
                console.log('Rename complete!');
            }
        })

    })
}
