"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
const readHandler = (req, resp) => {
    req.setEncoding("utf-8");
    req.on("data", (data) => {
        console.log(data);
    });
    req.on("end", () => {
        console.log("End: all data read");
        resp.end();
    });
};
exports.readHandler = readHandler;
