// This code creates a simple http server that listens for http requests
// on port 5000 and processes them using the fcn defined in handler.ts

// import { createServer } from "http";
// import { handler } from "./handler";
// const port = 5000;
// const server = createServer(handler);
// server.listen(port, function() {
//     console.log(`Server listening on port ${port}`);
// });

// import { createServer } from "http";
// import { handler } from "./handler";
// const port = 5000;
// const server = createServer();
// server.on("request", handler)
// server.listen(port);
// server.on("listening", () => {
//     console.log(`(Event) Server listening on port ${port}`);
// });

//many objects created with node.js api extend the Event Emitter class. Useful eventemitter methods
//on(event,callback)
// This method registers a callback to be invoked wheneber the specified event is emitted.

//off(event, callback)
//this method stops invoking the callback when the specific event is emitted.

//once(event, callback)
// this method registers a callback to be invoked the next time the specified event is emitted but not thereafter.

//Classes that extend EventEmitter define events and specify when they will be emitted. The server class
// returned by the createServer method extends EventEmitter and it defines two events that are used: the request and
// listening events.

// "It is important to understand that events are an integral part of the Node.js
// API and that they can be used directly, with the methods described in Table
// 4.3, or indirectly through other features."

// filtering requests in the server.ts
import { createServer } from "http";
import { handler } from "./handler";
const port = 5000;
const server = createServer();
server.on("request", (req, res) => {
    if (req.url?.endsWith("favicon.ico")) {
        res.statusCode = 404;
        res.end();} else {
        handler(req, res)
    }
});
server.listen(port);
server.on("listening", () => {
console.log(`(Event) Server listening on port${port}`);
});