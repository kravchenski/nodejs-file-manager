import { log } from "node:console";
import { access, constants, createReadStream, createWriteStream } from "node:fs"
import path from "node:path";

export default function copyCommand(filePath, newfilePath) {
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
                writeStream.on("finish", () => console.log("The file has been successfully recorded!"));
            });
        }

    });
}
