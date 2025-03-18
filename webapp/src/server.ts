import { createServer } from "http";
import express, {Express } from "express";
//import { basicHandler } from "./handler";
import { readHandler } from "./readHandler";

const port = 5000;
const expressApp: Express = express();

// expressApp.get("/favicon.ico", (req, resp) => {
//     resp.statusCode = 404;
//     resp.end();
// });
//expressApp.get("*", basicHandler);
expressApp.post("/read", readHandler);
expressApp.use(express.static("static"));
// the middleware component will attempt to match request URLs
// to files in the static directory
const server = createServer(expressApp);

server.listen(port,() =>
    console.log(`HTTP Server listening on port ${port}`)
);
