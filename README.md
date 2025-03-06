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

## Understanding Streams
In the world of web dev, a stream solves the problem of distributing data in the same way that a pipe solves the problem of distributing water.

"Like a pipe, a stream has two ends. At one end is the data producer, also
known as the writer, who puts a sequence of data values into the stream. At
the other end is the data consumer, also known as the reader, who receives
the sequence of data values from the stream. The writer and reader each have
their own API that allows them to work with the stream"

Two Characteristics
The data arrives in the same order in which it is written.
This is why streams are usually described as a sequence of data values.

The data values can be written to the stream over time so that the writer doesnt have to have all the data values ready before the first value is written.
- This means that the reader can receive and start processing data while the writer is still preparing or computing later values in the sequence.

   - This makes streams suitable for a wide range of data sources, and they all integrate well with the Node.js programming model.

## Using Node.js Streams

The streams model has two classes we will use a lot.
Writable, provides api for writing data to a stream 
Readable,  provides api for reading data from a stream

Usually one end of the stream is connected to something outside of the JS environment, like a network connection or the file system. This lets data to be read and written in the same way regardless of where it is going to or coming from.

For web dev... The most important use fo streams is they are used to represent HTTP requests and responses.

IncomingMessage and ServerResponse classes (which are used to represent HTTP reqs and responses) are derived from the Readable and Writable classes!!!

## Writing Data to a Stream
Writable class used to write data to a stream...

Writable class also emits events...

The basic approach to using a writable stream is to call the write method until all of the data has been sent to the stream and then call the end method.. Check handler.ts

It is easy to think of the endpoint of the steream as being a straight pipe to the web browser, but that is rarely the case!!!

"The endpoint for most streams is the part of the Node.js API
that interfaces with the operating system, in this case, the code that deals with
the operating system’s network stack to send and receive data. This indirectrelationship leads to important considerations, as described in the sections that follow."

## Understanding Stream Enhancements
Page 275