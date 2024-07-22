import { readFileSync } from "node:fs";
import { message, createDataItemSigner, spawn } from "@permaweb/aoconnect";

const wallet = JSON.parse(readFileSync("wallet.json").toString(),);
let managerProcess = "3RqM4MocaTQglSf2MiiEpoikZ3ZEds_UobDCtPmaQ-g"
const owner = managerProcess

async function main() {
    const processId = await spawn({
        // The Arweave TXID of the ao Module
        module: "Pq2Zftrqut0hdisH_MC2pDOT6S4eQFoxGsFUzR6r350",
        // The Arweave wallet address of a Scheduler Unit
        scheduler: "fcoN_xJeisVsPXA-trzVAuIiqO3ydLQxM-L4XbrQKzY",
        // A signer function containing your wallet
        signer: createDataItemSigner(wallet),

    });
    let tags = [
        { name: "Action", value: "Eval" },
    ]
    let data = 'local ao = require("ao"); Owner = "' + owner + '";';
    var delay = 5000;
    setTimeout(async function () {
        let messageId = await sendData(processId, tags, data)
        console.log("Message: " + messageId)
    }, delay);
    console.log("ProcessId: ", processId);
    return processId;
};
async function sendData(process, tags, data) {
    let id = await message({
        /*
          The arweave TXID of the process, this will become the "target".
          This is the process the message is ultimately sent to.
        */
        process,
        // Tags that the process will use as input.
        tags,
        // A signer function used to build the message "signature"
        signer: createDataItemSigner(wallet),
        /*
          The "data" portion of the message
          If not specified a random string will be generated
        */
        data,
    })
        .then(console.log)      // Log message ID
        .catch(console.error);
    return id;
}
main()
