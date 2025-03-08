import { IncomingMessage, ServerResponse } from "http";
export const readHandler = async (req: IncomingMessage, resp: ServerResponse) => {
    req.pipe(resp);
}
// By far simplest way to transfer data between streams.