import { IncomingMessage, ServerResponse } from "http";
import { Transform } from "stream"; 

export const readHandler = async (req: IncomingMessage, resp: ServerResponse) => {
    req.pipe(createLowerTransform()).pipe(resp);
}
const createLowerTransform = () => new Transform({
    transform(data, encoding, callback) {
        callback(null, data.toString().toLowerCase());
    }
});