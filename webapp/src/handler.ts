import { IncomingMessage, ServerResponse } from "http";
export const basicHandler = (req: IncomingMessage, resp: ServerResponse) => {
    for (let i = 0; i < 10; i++) {
        resp.write(`Message: ${i}\n`);
    }
    resp.end("End");
};