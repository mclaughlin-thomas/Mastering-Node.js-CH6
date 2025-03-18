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

Writable streams emit the drain event when their buffers have been drained...
At which point... More data can be written.

In Listing current version of handler.ts, data is
written to the HTTP response stream until the write method returns
false and then stops writing until the drain event is received. (If you
want to know when an individual chunk of data is flushed, then you can pass
a callback function to the stream’s write method.)

## Reading Data From a Stream
The most important source of data in a web app comes from the HTTP req body. Adding html file now.

## Understanding the Readable Class
Readable emitts events for data, end, close, pause, resume, error...

## Reading Data With Events
Data can be read from the streams using events! in readHandler.ts we see a callback function is used to process data as it becomes available. There we see the data event is emitted when data is available to be read from the stream and is available for processing by the callback fcn used to handle the event.

The data passed to the callback function as a Buffer, which represents an array of unsigned bytes... Unless... the setEncoding method has been used to specify character encoding. In which case, the data is expressed as a string.

In this example, we set the character encoding to UTF-8 so the callback function for the data event will receive string values.. Later these are written to the cli with console.log.

The end event is emitted when all of the data has been read from the stream.

...
Payload Message: 0
Payload Message: 1
Payload Message: 2
Payload Message: 3
...
Payload Message: 9997
Payload Message: 9998
Payload Message: 9999
End: all data read

The js main thread ensures that the data events are processed sequentially.

## Reading Data With an Iterator
Instances of the Readable class can be used as a source of data in a for loop, which can provide a more familiar way to read data from a stream.

## Piping Data to a Writable Stream
The pipe method is used to connect a Readable stream to a Writeable stream!!
This ensures that all data is read from readable and written to writable without further intervention.

"This is the simplest way to transfer data between streams, and the end method is called automatically on the Writeable stream once all of the data has been transferred."

The data that is sent in the HTTP request is piped to the HTTP response and displayed in the browser.

## Transforming Data
The transform class creates objects known as transformers. These transfromers receive data from a Readable stream, and then they process it in some way, and then pass it on.

Transfromers are applied to streams with the pipe method.

"The function receives three arguments: a chunk of data to
process, which can be of any data type, a string encoding type, and a callback
function that is used to pass on the transformed data. In this example, the data
that is received is converted to a string on which the toLowerCase method
is called. The result is passed to the callback function, whose arguments are
an object that represents any error that has occurred and the transformed data."

## Using Object Mode
Streams created by the Node.js API like those we used for HTTP requests or files work only on strings and byte arrays... This is not always convenient though, so, some streams including transformers can use object mode! Object mode allows objects to be read or written.

Updating index.html to send a json request body

Two transform constructor config settings are used to tell Node.js how a transformer will behave: readableObejctMode and writableObjectMode.

If the HTTP req has a Content-Type header that indicates the payload is JSON, then our transformer is used to parse the data.

The parsed payload is checked to see if its an array, and if it is then its length is used to generate our response.

## Using Third-Party Enhancements
The following sections describe usefull enhancements provided by the Express package to deal with streams and tasks that are related to HTTP.

## Working With Files
Node.js provides a good API to deal with files in the fs module. It has support for reading and writing streams as well as convenient featurees that read or write complete files like the readFileSync function.

creating client.js
^ Same code as contained in .html just moving it to here now.

Middleware components are set up with the use method. server.ts is now modified to serve files.

"http://localhost:5000/client.js , for example, will be handled byreturning the contents of the client.js file in the static folder."


## Serving files from client-side packages


## Sending and Downloading Files
The Response class, through Express provides ServerResponse, defines methods to deal with files: sendFile(path, config) and download(path)

The sendFile and download methods are useful because they provide solutions to problems that cannot be solved using the static middleware.

Adding new routes in the server.ts file

the sendFile method is good when you need to respond with the content of a file, but the request path does not contain the filename. The args are the name of the ifle and a config object, whose root property specifies the directory that contains the file.

the download method sets the Content-Disposition response headerm which cuases most browsers to treat the file contents as a download that should be saved.

"http://localhost:5000/sendcity and
http://localhost:5000/downloadcity .
The first URL will cause the browser to display the image in the browser window. The second URL will prompt the user to save the file."