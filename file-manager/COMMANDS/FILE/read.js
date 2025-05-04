import { error, log } from "node:console";
import { createReadStream, write } from "node:fs";
import path from "node:path";
import { stdout } from "node:process";

export default function catCommand(filePath, currentWorkDirectory) {
    var file = path.join(currentWorkDirectory, filePath)
    const inputFile = createReadStream(file)
    inputFile.on("readable", () => {
        const data = inputFile.read()
        if (data) {
            stdout.write(data)
        }
        else {
            log("")
        }
    })
    inputFile.on("error", () => {
        log("Operation failed!")
    })
}