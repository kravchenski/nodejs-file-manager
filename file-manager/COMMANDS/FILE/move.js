import { unlink } from "node:fs";
import { log } from "node:console";
import { access, constants, createReadStream, createWriteStream } from "node:fs"
import path from "node:path";

export default function moveCommand(filePath, newfilePath) {
    const fileName = path.basename(filePath);
    const newFile = path.join(newfilePath, fileName);

    access(filePath, constants.F_OK, (err) => {
        if (err) {
            log("Operation failed!");
            return;
        }
        else {
            access(newFile, constants.F_OK, (err2) => {
                if (!err2) {
                    log("Operation failed!");
                    return;
                }
                const currentFile = createReadStream(filePath);
                const writeStream = createWriteStream(newFile);
                currentFile.pipe(writeStream);
                writeStream.on("finish", () => unlink(filePath, (err) => {
                    if (err) return;
                    else {
                        log('File was moved succesfully!');
                    }
                }));

            });

        }

    });
} 