var http  = require('http');
      fs = require('fs');

function serverStaticFile(response,path, contentType, responseCode){
  if(!responseCode) responseCode = 200;
  fs.readFile(__dirname + path, function(err, data){
    if(err){
      response.writeHead(500,{'content-Type':'text/plain'});
      response.end('500 - Internal Error');
    }else{
      response.writeHead(responseCode,{'Content-Type':'text/plain'});
      response.end(data);
    }
  });
}


http.createServer((request, response)=>{

  //normalize url by removing querystrring, optional
  //trailing slash, and making it lowercase

  var path = request.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase();

  switch(path){
    case '':
      // response.writeHead(200,{'Content-Type':'text/plain'});
      // response.end('Homepage');

      serverStaticFile(response,'/public/home.html','text/html');
      break;

    case '/about':
      // response.writeHead(200,{'Content-Type':'text/plain'});
      // response.end('About');

      serverStaticFile(response,'/public/about.html','text/html');
      break;

    case '/img/logo.jpg':
      serverStaticFile(response,'/public/img/logo.jpg','image/jpeg');
      break;

    default:
      // response.writeHead(404,{'Content-Type':'text/plain'});
      // response.end('Not Found');
      serverStaticFile(response,'/public/404.html','text/html');
      break;

    }

}).listen (3000);


console.log("Server started on localhost:3000, press Ctrl-C to terminate");
