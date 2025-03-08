import { IncomingMessage, ServerResponse } from "http";
export const readHandler = (req: IncomingMessage, resp: ServerResponse) => {
// TODO - read request body
    resp.end();
}