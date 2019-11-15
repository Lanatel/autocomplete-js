var http = require ("http");
var fs = require('fs');


var send404Error = function(response) {
    response.writeHead(404, {"Content-Type" : "text/plain"});
    response.write("Page Not Found");
    response.end();
};

var sendIndexFile = function(response) {
    console.log("Index file has been opened");

    response.writeHead(200, {"Content-Type": "text/html"});
    fs.createReadStream("./app.html").pipe(response);
};

var sendJsFile = function(response) {
    console.log("Js file has been opened");

    response.writeHead(200, {"Content-Type": "text/js"});
    fs.createReadStream("./public/js/index.js").pipe(response);
};

var sendCssFile = function(response) {
    console.log("Css file has been opened");

    response.writeHead(200, {"Content-Type": "text/css"});
    fs.createReadStream("./public/css/app.css").pipe(response);
};

var sendCitiesFile = function(response) {
    console.log("Cities file has been opened");

    response.writeHead(200, {"Content-Type": "text/json"});
    fs.createReadStream("./js/cities.json").pipe(response);
};

var onRequest = function(request, response) {

    if(request.method == "GET") {
        switch (request.url) {
            case "/":
                sendIndexFile(response);
                return;
            case "/public/js/index.js":
                sendJsFile(response);
                return;
            case "/public/css/app.css":
                sendCssFile(response);
                return;
            case "/cities.json":
                sendCitiesFile(response);
                return;
        }
    }

    send404Error(response);
}

http.createServer(onRequest).listen(8888, '0.0.0.0' || '127.0.0.1');
console.log("Server is now running...");