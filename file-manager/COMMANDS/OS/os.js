import { log } from "node:console"
import { arch, cpus, EOL, homedir, userInfo } from "node:os"

export default function osCommandHandler(osParam) {
    switch (osParam) {
        case 'EOL':
            log(JSON.stringify(EOL))
            break
        case 'cpus':
            log(cpus().map((cpu) => {
                return cpu.model
            }))
            log(cpus().length)
            break
        case 'homedir':
            log(homedir())
            break
        case 'username':
            log(userInfo().username)
            break
        case 'architecture':
            log(arch())
            break
        default:
            log("Operation failed!")
            break
    }
}