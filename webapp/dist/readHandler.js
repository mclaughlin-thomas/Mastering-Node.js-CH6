"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
const stream_1 = require("stream");
const readHandler = async (req, resp) => {
    if (req.headers["content-type"] == "application/json") {
        req.pipe(createFromJsonTransform()).on("data", (payload) => {
            if (payload instanceof Array) {
                resp.write(`Received an array with ${payload.length} items`);
            }
            else {
                resp.write("Did not receive an array");
            }
            resp.end();
        });
    }
    else {
        req.pipe(resp);
    }
};
exports.readHandler = readHandler;
const createFromJsonTransform = () => new stream_1.Transform({
    readableObjectMode: true,
    transform(data, encoding, callback) {
        callback(null, JSON.parse(data));
    }
});
