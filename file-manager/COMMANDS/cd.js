import { log } from "node:console";
import path from "node:path";
import { chdir, cwd } from "node:process";

export default function cdCommand(targetPath, currentWorkDirectory) {
    try {
        if (targetPath) {
            if (/^[a-zA-Z]:$/.test(targetPath)) {
                targetPath += '\\';
            }
            chdir(path.resolve(targetPath));
            currentWorkDirectory = cwd();
            log(`You are currently in ${currentWorkDirectory}`);
        }
        else {
            log(`Add argument (path) :)`);

        }
    }
    catch(err){
        log(`Operation failed!`);

    }

}
