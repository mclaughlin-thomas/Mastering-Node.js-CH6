import { IncomingMessage, ServerResponse } from "http";
export const basicHandler = (req: IncomingMessage, resp: ServerResponse) => {
    resp.setHeader("Content-Type", "text/plain");
    for (let i = 0; i < 10; i++) {
        resp.write(`Message: ${i}\n`);
    }
    resp.end("End");
};
// Using a stream enhancement in the handler.ts