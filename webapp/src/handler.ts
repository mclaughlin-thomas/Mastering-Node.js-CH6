// this file defines the code that will process http requests.
// "For now, it is enough to know that the HTTP request is represented
// by an Incoming Message object, and the response is created by using the
// ServerResponse object"

// import { IncomingMessage, ServerResponse } from "http";

// export const handler = (req: IncomingMessage, res:ServerResponse) => {
//     res.end("Hello World");
// };

// Using the node.js API to read the contents of a file.
// three callbacks in the code. One that is passed to the createServer function, which is invoked when
// an http request is received.
// Another callback is the one that is passed to the readFile function, which is invoked when
// when the contents of the file have been read or if an error occurs.
// Then the third callback is invoked when the data read from the file has been sent to the client

//Breaking up the process of producing an http response with callbacks
// means that the js main thread does not have to wait for the file system to read the contents of the file,
// this allows requests from other clients to be procesed.
// import { IncomingMessage, ServerResponse } from "http";
// import { readFile } from "fs";

// export const handler = (req: IncomingMessage, res:ServerResponse) => {
//     readFile("data.json", (err: Error | null, data: Buffer) => {
//         // reads the contents of a file.
//         if (err == null) {
//             res.end(data, () => console.log("Filesent")); // comes up when user sends request. 3rd callback
//         }
//         //The read operation is asynchronous and is implemented using a native thread.
//         //The contents of the file are passed to a callback function, which sends them to the http client.
//         else {
//             console.log(`Error: ${err.message}`);
//             res.statusCode = 500;
//             res.end();
//         }
//     });
// };


// Now using a promise in the handler.ts file
// import { IncomingMessage, ServerResponse } from "http";
// //import { readFile } from "fs";
// import { readFile } from "fs/promises";
// export const handler = (req: IncomingMessage, res: ServerResponse) => {
//     const p: Promise<Buffer> = readFile("data.json");
//     p.then((data: Buffer) => res.end(data, () => console.log("File sent")));
//     p.catch((err: Error) => {
//         console.log(`Error: ${err.message}`);
//         res.statusCode = 500;
//         res.end();
//     });
// };

// This is not how promises are usually used, but emphasizes the way promises work
// This creates promise
// const p: Promise<Buffer> = readFile("data.json");
// the result returned from the readFile function is Promise<Buffer>, which
// is a promse that will produce a Buffer object when its asynchronous operation is done

// "In most cases, you should use the non-blocking features that
// Node.js provides to maximize the number of requests that
// Node.js can handle, but there are two situations when blockingoperations make more sense. The first situation arises when
// you know for certain that the operations will be completed so
// quickly that it is quicker than setting up a promise or a
// callback. There is a resource and time cost associated with
// performing an asynchronous operation and this can sometimes
// be avoided. This situation doesn’t arise often, and you should
// carefully consider the potential performance impact.
// The second situation is more common, and that’s when you
// know that the next block of code that the main thread will
// execute will be the result of the operation you are about to
// perform. You can see an example of this in Chapter 6, where I
// read configuration files synchronously before Node.js starts
// listening for HTTP requests."

// Promises are either resolved or rejected. Promise completes successfuly? -> its resolved.
// The "then" method is used to registerr the function that will be invoked if the promise is resolved
// meaning that the file has been read successfully like this:
//p.then((data: Buffer) => res.end(data, () => console.log("File sent")));

// A rejected promise is one where an error has occured. the catch method is used to register
// a function that handles the error produced by a rejected promise:
// p.catch((err: Error) => {
//     console.log(`Error: ${err.message}`);
//     res.statusCode = 500;
//     res.end();
// });


// The then and catch methods can be chained together, which is one small
// improvement in simplifying the code, as shown in Listing 4.13, and is a more
// typical way to use promises.

// import { IncomingMessage, ServerResponse } from "http";
// import { readFile } from "fs/promises";
// export const handler = (req: IncomingMessage, res: ServerResponse) => {
//     readFile("data.json")
//     .then((data: Buffer) => res.end(data, () => console.log("File sent")))
//     .catch((err: Error) => {
//         console.log(`Error: ${err.message}`);
//         res.statusCode = 500;
//         res.end();
//     });
// };

// The above is a little nearer, but the real improvements come from async and await keywords
//using async and await keywords in the handler.ts
// import { IncomingMessage, ServerResponse } from "http";
// import { readFile } from "fs/promises";export const handler = async (req: IncomingMessage, res: ServerResponse) => {
//     const data: Buffer = await readFile("data.json");
//     res.end(data, () => console.log("File sent"));
// };
// the async await keywords flatten the code by removing the need for the then method and its function.
// The async keyword is applied to the function to handle requests
// export const handler = async (req: IncomingMessage, res: ServerResponse) => {

// The await keyword is applied to statements that return promises, like this:
// const data: Buffer = await readFile("data.json");

// adding error handling
// import { IncomingMessage, ServerResponse } from "http";
// import { readFile } from "fs/promises";
// export const handler = async (req: IncomingMessage, res: ServerResponse) => {
//     try {
//         const data: Buffer = await readFile("data.json");
//         res.end(data, () => console.log("File sent"));
//     } catch (err: any) { // any because js does not restrict the types that can be used to represent errors
//         console.log(`Error: ${err?.message ?? err}`);
//         res.statusCode = 500;
//         res.end();
//     }
// };

// "One advantage of callbacks over promises is that callbacks
// can be invoked more than once for the same operation,
// allowing a series of updates to be provided while
// asynchronous work is being performed. Promises are
// intended to produce a single result without any interim
// updates. You can see an example of this difference at the end
// of the chapter."

// "Not every part of the Node.js API supports both promises and callbacks, and
// that can lead to both approaches being mixed in the same code. You can see
// this problem in the example, where the readFile function returns a
// promise, but the end method, which sends data to the client and finishes the
// HTTP response, uses a callback"

// using a promise in the handler.ts
// import { IncomingMessage, ServerResponse } from "http";
// import { readFile } from "fs/promises";
// import { endPromise } from "./promises"; // NEW
// export const handler = async (req: IncomingMessage, res: ServerResponse) => {
//     try {
//         const data: Buffer = await readFile("data.json");
//         await endPromise.bind(res)(data); // NEW, have to bind method when using the await keyword on the fcn that promisify creates
//         console.log("File sent"); // NEW
//     } catch (err: any) {
//         console.log(`Error: ${err?.message ?? err}`);
//         res.statusCode = 500;
//         res.end();
//     }
// };

// a blocking operation in the handler.ts file
// import { IncomingMessage, ServerResponse } from "http";
// //import { readFile } from "fs/promises";
// import { endPromise, writePromise } from "./promises";
// const total = 2_000_000_000;
// const iterations = 5;
// let shared_counter = 0;
// export const handler = async (req: IncomingMessage , res: ServerResponse) => {
//     const request = shared_counter++;
//     for (let iter = 0; iter < iterations; iter++) {
//         for (let count = 0; count < total; count++) {
//             count++;
//         }
//         const msg = `Request: ${request}, Iteration: ${(iter)}`;
//         console.log(msg);
//         await writePromise.bind(res)(msg + "\n");
//     }
//     await endPromise.bind(res)("Done");
// };

// in the above example the main thread is blocked until both loops have completed
// "To see the effect of the blocked thread, open
// two browser tabs and request http://localhost:5000 in both of them.
// You need to start the request in the second tab before the first one has
// finished, and you may need to adjust the total value to give yourself time.
// The total value in Listing 4.20 takes three or four seconds to complete on
// my system, which is long enough to start requests in both browser tabs."

// "Some browsers, including Chrome, won’t make simultaneous
// requests for the same URL. This means that the request fromthe second browser tab won’t be started until the response
// from the first tab’s request has been received, which can make
// it look like requests are always blocking."...
// "You can avoid this problem by disabling the browser cache
// (Chrome has a Disable Cache checkbox on the Network tab
// in the F12 developer tools window, for example) or requesting
// different URLs, such as http://localhost:5000?id=1
// and http://localhost:5000?id=2 ."

// Yielding control of the main thread
// one way to address blocking is to break up work into smaller chunks
// that are hopefully interleaved with other requests
// the work is still done entirely with the main thread, but hte blocking
// that occurs in a series of shorter periods, which means that access to the main thread
// is more equitable.

// import { IncomingMessage, ServerResponse } from "http";
// import { endPromise, writePromise } from "./promises";
// const total = 2_000_000_000;
// const iterations = 5;
// let shared_counter = 0;
// export const handler = async (req: IncomingMessage, res: ServerResponse) => {
//     const request = shared_counter++;
//     const iterate = async (iter: number = 0) => {
//         for (let count = 0; count < total; count++) {
//             count++;
//         }
//         const msg = `Request: ${request}, Iteration: ${(iter)}`;
//         console.log(msg);
//         await writePromise.bind(res)(msg + "\n");
//         if (iter == iterations -1) {
//             await endPromise.bind(res)("Done");
//         }
//         else {
//             setImmediate(() => iterate(++iter));
//         }
//     }
//     iterate();
// };
// This will make multiple requests interleaved

// Using a worker thread in the handler.ts

// import { IncomingMessage, ServerResponse } from "http";
// import { endPromise, writePromise } from "./promises";
// import { Worker } from "worker_threads";
// const total = 2_000_000_000;
// const iterations = 5;let shared_counter = 0;
// export const handler = async (req: IncomingMessage, res: ServerResponse) => {
//     const request = shared_counter++;
//     //Worker threads are created by instantiating the Worker class
//     const worker = new Worker(__dirname + "/count_worker.js", {
//         workerData: {
//             iterations,
//             total,
//             request
//         }
//     });
//     //Worker threads communicate with the main thread by emitting events
//     // which are then handled by fuctions registered by the on method
//     worker.on("message", async (iter: number) => {
//         const msg = `Request: ${request}, Iteration: ${(iter)}`;
//         console.log(msg);
//         await writePromise.bind(res)(msg + "\n");
//     });
//     worker.on("exit", async (code: number) => {
//         if (code == 0) {
//             await endPromise.bind(res)("Done");
//         }
//         else {
//             res.statusCode = 500;
//             await res.end();
//         }
//     });
//     worker.on("error", async (err) => {
//         console.log(err);
//         res.statusCode = 500;
//         await res.end();
//     });
// };

//the important difference from the earlier examples is that work
// for requests is being performed in parallel rather than all of the work being
// performed on a single thread


// import { IncomingMessage, ServerResponse } from "http";
// import { endPromise, writePromise } from "./promises";
// //import { Worker } from "worker_threads";
// import { Count } from "./counter_cb";const total = 2_000_000_000;
// const iterations = 5;
// let shared_counter = 0;
// export const handler = async (req: IncomingMessage, res: ServerResponse) => {
//     const request = shared_counter++;
//     Count(request, iterations, total, async (err,update) => {
//         if (err !== null) {
//             console.log(err)
//             res.statusCode = 500;
//             await res.end();
//         }
//         else if (update !== true) {
//             const msg = `Request: ${request}, Iteration: ${(update)}`;
//             console.log(msg);
//             await writePromise.bind(res)(msg + "\n");
//         }
//         else {
//             await endPromise.bind(res)("Done");
//         }
//     });
// };

// This example produces the same results as the previous example but is moreconsistent with the majority of the Node.js API, the key parts of which are
// described in the chapters that follow.

// Using a promise in the handler.ts file

import { IncomingMessage, ServerResponse } from "http";
import { endPromise, writePromise } from "./promises";
//import { Count } from "./counter_cb";
import { Count } from "./count_promise";
const total = 2_000_000_000;
const iterations = 5;
let shared_counter = 0;
export const handler = async (req: IncomingMessage, res: ServerResponse) => {
    const request = shared_counter++;
    try {
        await Count(request, iterations, total);
        const msg = `Request: ${request}, Iterations: ${(iterations)}`;
        await writePromise.bind(res)(msg + "\n");await endPromise.bind(res)("Done");
    }
    catch (err: any) {
        console.log(err);
        res.statusCode = 500;
        res.end();
    }
};