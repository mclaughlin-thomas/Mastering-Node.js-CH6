"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicHandler = void 0;
const basicHandler = (req, resp) => {
    resp.setHeader("Content-Type", "text/plain");
    let i = 0;
    let canWrite = true;
    const writeData = () => {
        console.log("Started writing data");
        do {
            canWrite = resp.write(`Message: ${i++}\n`);
        } while (i < 10000 && canWrite);
        console.log("Buffer is at capacity");
        if (i < 10000) {
            resp.once("drain", () => {
                console.log("Buffer has been drained");
                writeData();
            });
        }
        else {
            resp.end("End");
        }
    };
    writeData();
};
exports.basicHandler = basicHandler;
// Avoiding excessive data buffering in the handler.ts
// The writeData fcn enters a do while loop
// It will write data to the stream until the write method returns false.
// ---this means our buffer is full!!!!
// The once method is used to register a  handler that will be invoked
// when the drain event is emitted, and then invokes the writeData fcn 
// to resume writing.
// Once all the data has been written, the end method is called to finalize the stream.
