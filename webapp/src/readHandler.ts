import { IncomingMessage, ServerResponse } from "http";
export const readHandler = (req: IncomingMessage, resp: ServerResponse) => {
    req.setEncoding("utf-8");
    req.on("data", (data: string) => {
        console.log(data);
    });
    req.on("end", () => {
        console.log("End: all data read");
        resp.end();
    });
}