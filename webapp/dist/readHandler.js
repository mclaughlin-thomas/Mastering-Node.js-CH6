"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
const readHandler = async (req, resp) => {
    req.pipe(resp);
};
exports.readHandler = readHandler;
// By far simplest way to transfer data between streams.
