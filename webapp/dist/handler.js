"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicHandler = void 0;
const basicHandler = (req, resp) => {
    resp.setHeader("Content-Type", "text/plain");
    for (let i = 0; i < 10000; i++) {
        if (resp.write(`Message: ${i}\n`)) {
            console.log("Stream buffer is at capacity");
        }
    }
    resp.end("End");
};
exports.basicHandler = basicHandler;
// Checking stream Capacity!!!
