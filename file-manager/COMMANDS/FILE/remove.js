import { log } from "node:console";
import constants from "node:constants";
import { access, unlink } from "node:fs";

export default function removeCommand(filePath) {
    access(filePath, constants.F_OK, (err) => {
        if (err) {
            log("Operation failed!");
            return;
        }
        else {
            unlink(filePath, (err) => {
                if (err) return;
                else {
                    log('File was removed succesfully!');
                }
            })
        }

    })



} 