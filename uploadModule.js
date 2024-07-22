import { readFileSync } from "node:fs";
import { message, createDataItemSigner, result } from "@permaweb/aoconnect";

const PongModule = readFileSync("./PongModule.lua").toString();
const wallet = JSON.parse(readFileSync("wallet.json").toString(),);
let managerProcess = "3RqM4MocaTQglSf2MiiEpoikZ3ZEds_UobDCtPmaQ-g"
const processId = managerProcess;

const uploadModule = async (handler, module) => {
    try {
        // The only 2 mandatory parameters here are process and signer
        let messageId = await message({

            // The arweave TXID of the process, this will become the "target".
            // This is the process the message is ultimately sent to.

            process: processId,
            // Tags that the process will use as input.
            tags: [
                { name: "Action", value: handler },
            ],
            data: module,
            // A signer function used to build the message "signature"
            signer: createDataItemSigner(wallet),
        })

        let { Messages, Spawns, Output, Error } = await result({
            // the arweave TXID of the message
            message: messageId,
            // the arweave TXID of the process
            process: processId,
        });
        console.log(Messages)
        console.log(Spawns)
        console.log(Output)
        console.log(Error)
    } catch (e) {
        console.log(e)
    }
}
await uploadModule("UploadPongModule", PongModule)
