"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
//import { basicHandler } from "./handler";
const readHandler_1 = require("./readHandler");
const port = 5000;
const expressApp = (0, express_1.default)();
// expressApp.get("/favicon.ico", (req, resp) => {
//     resp.statusCode = 404;
//     resp.end();
// });
//expressApp.get("*", basicHandler);
expressApp.post("/read", readHandler_1.readHandler);
//MIDDLEWARE BELOW
expressApp.use(express_1.default.static("static"));
// the middleware component will attempt to match request URLs
// to files in the static directory
expressApp.use(express_1.default.static("node_modules/bootstrap/dist"));
//MIDDLEWARE ABOVE
const server = (0, http_1.createServer)(expressApp);
server.listen(port, () => console.log(`HTTP Server listening on port ${port}`));
