import { IncomingMessage, ServerResponse } from "http";
import { Transform } from "stream"; 

export const readHandler = async (req: IncomingMessage, resp: ServerResponse) => {
    if (req.headers["content-type"] == "application/json") {
        
        req.pipe(createFromJsonTransform()).on("data", (payload) => {
            if (payload instanceof Array) {
                resp.write(`Received an array with ${payload.length} items`)
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
}
const createFromJsonTransform = () => new Transform({
    readableObjectMode: true,
    transform(data, encoding, callback) {
        callback(null, JSON.parse(data));
    }
});