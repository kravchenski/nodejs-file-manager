import { log } from "node:console"
import { writeFile } from "node:fs"
import path from "node:path"

export default function addCommand(filePath, currentWorkDirectory) {
    var file = path.join(currentWorkDirectory, filePath)
    if (path.extname(file) != "") {
        writeFile(file, "", "utf-8", (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        })
    }
    else {
        log("Operation failed!")
    }

}