import { log, table } from "node:console";
import { readdir, stat } from "node:fs";

export default function lsCommand(currentWorkDirectory) {
    readdir(currentWorkDirectory, (err, files) => {
        const tableData = []
        if (err) {
            log(`Error reading directory: ${err.message}`);
            return;
        }
        files.forEach((file) => {
            stat(`${currentWorkDirectory}/${file}`, (err, stats) => {
                if (err) {
                    log(`Error file: ${err.message}`);
                }
                else {
                    tableData.push({ Name: file, Type: stats.isFile() ? 'file' : 'directory' });
                    if (tableData.length == files.length) {
                        table(tableData)
                    }
                }

            })

        })


    });
}