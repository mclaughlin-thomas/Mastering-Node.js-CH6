# Mastering-Node.js-CH6

## Using Node.js Streams
One main task in server-side development is transferring data.

Either reader data sent by a client or browser or writing data that must be transmitted or stored in some way.

Node.js API can deal with data sources and data destinations, known as streams. We can use these streams to deal with HTTP requests, and explain why one common source of data, the file system, should be used with caution!

Errata:
"In this chapter, I will continue to use the webapp project created in Chapter4 and modified in Chapter 3"
Should be 
"In this chapter, I will continue to use the webapp project created in Chapter 4 and modified in Chapter 5."


Updated to Ch5 proj
With the updated server.ts and handler.ts, the Express router filters out the favicon request and passes on all other HTTP get reqs to our function basicHandler.

That handler uses Node.js IncomingMessage and ServerResponse types even though Express is used to route the requests.

Pickup 267: Understanding Streams