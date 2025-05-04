import { log } from "node:console";
import constants from "node:constants";
import { createHash } from "node:crypto";
import { access, createReadStream } from "node:fs";
import path from "node:path";

export default function hashCommand(filePath, currentWorkDirectory) {
    if (filePath) {
        var newPath = path.join(currentWorkDirectory, filePath)
        access(newPath, constants.F_OK, (err) => {

            if (err) log('Operation failed!');
            else {
                const hash = createHash('sha256')
                const input = createReadStream(newPath)
                input.on('readable', () => {
                    const data = input.read()
                    if (data) {
                        hash.update(data)
                    }
                    else {
                        log(`${hash.digest('hex')}`);
                    }
                })
            }



        })
    }
    else {
        log('Operation failed!');
    }

}