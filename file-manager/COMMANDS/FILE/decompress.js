import { log } from "node:console";
import { createReadStream, createWriteStream } from "node:fs";
import { basename, extname, isAbsolute, join } from "node:path";
import { createBrotliDecompress } from "node:zlib";


export default function decompressCommand(filePath, currentWorkDirectory, archivefilePath) {
    const sourceFilePath = isAbsolute(filePath) ? filePath : join(currentWorkDirectory, filePath);
    const destinationDir = isAbsolute(archivefilePath)
        ? archivefilePath
        : join(currentWorkDirectory, archivefilePath);

    const outputFileName = basename(filePath, extname(filePath));
    const outputPath = join(destinationDir, `${outputFileName}.txt`);

    const readStream = createReadStream(sourceFilePath);
    const writeStream = createWriteStream(outputPath);
    const brotli = createBrotliDecompress();

    readStream.pipe(brotli).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log("Decompression completed successfully!");
    });

    readStream.on('error', (err) => {
        log("Operation error!");
    });

    brotli.on('error', (err) => {
        log("Operation error!");
    });

    writeStream.on('error', (err) => {
        log("Operation error!");
    });
}