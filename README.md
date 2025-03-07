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

Some streams are enhanced... Which means that the data you write to a stream will not always be the same data that is received at the other end!

"In the case of HTTP responses, for example, the Node.js HTTP API aids
development by ensuring that all responses conform to the basic requirements
of the HTTP protocol, even when the programmer doesn’t explicitly use the
features provided to set the status code and headers"

When curl --include http://localhost:5000
We see the Node.js API adds all fields to make it a legal HTTP  req
This is a helpful feature and helps illustrate the fact that we canno assume that the data we write to a stream will be the same data that arrives at the other end.

Similar thing with ServerResponse...

Before using a stream enhancement method:
HTTP/1.1 200 OK
X-Powered-By: Express
Date: Fri, 07 Mar 2025 16:50:38 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

Message: 0
Message: 1
Message: 2
Message: 3
Message: 4
Message: 5
Message: 6
Message: 7
Message: 8
Message: 9

After using a stream enhancement method:
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/plain
Date: Fri, 07 Mar 2025 16:47:35 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

Message: 0
Message: 1
Message: 2
Message: 3
Message: 4
Message: 5
Message: 6
Message: 7
Message: 8
Message: 9

## Avoiding Excessive Data Buffering
Writable streams are created with a buffer, in which, data is stored before it is processed.

The buffer is a way to improve performance. It does this by:

Allowing the producer of data to write data to the stream in bursts faster than the stream endpoint can process them

Every time the stream processes a chunk of data, we say it has "flushed" the data.

When all the data in the stream's buffer has been processed, the stream buffer is said to have been "drained".

The amount of data that can be stored in the buffer is known as the high-water mark.

The writable stream will always accept data, even if it has to increase the size of its buffer; however, THIS IS UNDESIRABLE because it increases the demand for memory that can be required for an extended period while the stream flushes the data it currently contains.

Ideally, the approach is to write data to a stream until its buffer is full, THEN, wait until that data is flushed before further data is written to it.

To hel acheive this this goal, the write method returns a bool value, which indicates whether the stream can receive more data w/o expanding its current buffer beyond its target high-water mark...