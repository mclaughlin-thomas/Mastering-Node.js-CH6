import { IncomingMessage, ServerResponse } from "http";
export const basicHandler = (req: IncomingMessage, resp: ServerResponse) => {
    resp.setHeader("Content-Type", "text/plain");
    for (let i = 0; i < 10_000; i++) {
        if (resp.write(`Message: ${i}\n`)) {
            console.log("Stream buffer is at capacity");
        }
    }resp.end("End");
};
// Checking stream Capacity!!!