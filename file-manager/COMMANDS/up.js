import { log } from "node:console"
import path from "node:path"
import { cwd } from "node:process"

export default function upCommand(currentWorkDirectory) {
    process.chdir(`${path.dirname(currentWorkDirectory)}${path.sep}`)
    currentWorkDirectory = cwd()
    log(`You are currently in ${currentWorkDirectory}`)

}