import { log } from "node:console";
import constants from "node:constants";
import { access, createReadStream, createWriteStream } from "node:fs";
import path from "node:path";
import { createBrotliCompress } from "node:zlib";

export default function compressCommand(filePath, currentWorkDirectory, archivefilePath) {
    try {
        var isFilePath = path.join(currentWorkDirectory, filePath)
        if (isFilePath && archivefilePath) {
            var pathBaseName = path.basename(path.join(currentWorkDirectory, isFilePath), path.extname(isFilePath))
            var newPath = path.join(archivefilePath, `${pathBaseName}.gz`)
            access(isFilePath, constants.F_OK, (err) => {
                if (err) log("Operation error!");
                else {
                    const inp = createReadStream(isFilePath)
                    const out = createWriteStream(newPath)
                    const brot = createBrotliCompress()
                    inp.pipe(brot).pipe(out)
                    log("Compress succesfully!")
                }
            })
        }
        else {
            log("Operation error!");
        }
    }
    catch(err){
        log("Operation error!");

    }
    

}