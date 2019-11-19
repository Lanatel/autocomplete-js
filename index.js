let http = require ("http");
let fs = require('fs');


let send404Error = function(response) {
    response.writeHead(404, {"Content-Type" : "text/plain"});
    response.write("Page Not Found");
    response.end();
};

let sendFile = function(response, filePath, contentType = 'text/plain') {
    console.log(`${filePath} file has been opened`);

    response.writeHead(200, {"Content-Type": contentType});
    fs.createReadStream(filePath).pipe(response);
};

let onRequest = function(request, response) {

    if(request.method === "GET") {
        switch (request.url) {
            case "/":
                sendFile(response, './app.html', 'text/html');
                return;
            case "/public/js/index.js":
                sendFile(response, './public/js/index.js', 'text/js');
                return;
            case "/public/css/app.css":
                sendFile(response, './public/css/app.css', 'text/css');
                return;
            case `/${(process.env.LOCALE || 'ru_RU')}/cities.json`:
                sendFile(response, `./src/${(process.env.LOCALE || 'ru_RU')}_cities.json`, 'text/json');
                return;
        }
    }

    send404Error(response);
};

http.createServer(onRequest).listen(8888, '0.0.0.0' || '127.0.0.1');
console.log("Server is running now...");