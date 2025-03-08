import { IncomingMessage, ServerResponse } from "http";
export const readHandler = async (req: IncomingMessage, resp: ServerResponse) => {
    req.setEncoding("utf-8");
    for await (const data of req) {
        console.log(data);
    }
    console.log("End: all data read");
    resp.end();
}
// Reading data in a loop in the readHandler
// the for loop reads data from the stream until it is all consumed