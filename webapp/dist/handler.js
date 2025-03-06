"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicHandler = void 0;
const basicHandler = (req, resp) => {
    for (let i = 0; i < 10; i++) {
        resp.write(`Message: ${i}\n`);
    }
    resp.end("End");
};
exports.basicHandler = basicHandler;
