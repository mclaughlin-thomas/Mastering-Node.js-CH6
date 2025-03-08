"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
const readHandler = async (req, resp) => {
    req.setEncoding("utf-8");
    for await (const data of req) {
        console.log(data);
    }
    console.log("End: all data read");
    resp.end();
};
exports.readHandler = readHandler;
// Reading data in a loop in the readHandler
// the for loop reads data from the stream until it is all consumed
