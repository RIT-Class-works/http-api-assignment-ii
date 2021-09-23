// create server
// urlstruct for loading index

const http = require('http');
const url = require('url');
// const query = require('querystring');
const htmlHandler = require('./htmlResponse');
const jsonHandler = require('./jsonResponse');

const urlStruct = {

  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/getUser': jsonHandler.getResponse,
    '/notReal': jsonHandler.getResponse,
  },
  Head: {
    '/getUser': jsonHandler.getMetaData,
    '/notReal': jsonHandler.getMetaData,
  },
  Post: {
    '/getUser': jsonHandler.getResponse,
    '/notReal': jsonHandler.getResponse,
  },
  // notFound: jsonHandler.getResponse,
};

const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);
  console.log(parsedURL.pathname);

  if (urlStruct[request.method][parsedURL.pathname]) {
    urlStruct[request.method][parsedURL.pathname](request, response, parsedURL.pathname);
  } /* else {
    urlStruct.notFound(request, response, acceptedTypes, parsedURL.pathname);
  } */
};

const port = process.env.PORT || process.env.NODE_PORT || 3000;
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
