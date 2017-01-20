/*var http = require('http');
var fs = require('fs');

//404 responce 
function send404Responce(responce) {
	responce.writeHead(404, {"Content-type":"text/plain"});
	responce.write("Error 404: Page not found!");
	responce.end();
}

//Handle a user request 
function onRequest(request, responce){
	if(request.method == 'GET' && request.url == '/'){
		responce.writeHead(200, {"Content-type":"text/html"});
		fs.createReadStream("./index.html").pipe(responce);
	}
	else{
            send404Responce(responce);
	}
}

http.createServer(onRequest).listen(3220);
console.log("Server is now running...");
*/

var connect = require('connect');
var http = require('http');

var app =  connect();

function doFirst(request, responce, next){
     console.log("Bacon");
     //next();
}


function doSecond(request, responce, next){
     console.log("Tuna");
     next();
}

function forum(request, responce){
	console.log('User requested forum ');
}

function profile(request, responce){
	console.log("User requested profile");
}

/*
app.use(doFirst);
app.use(doSecond);*/
app.use('/profile', profile);
app.use('/forum', forum);


http.createServer(app).listen(3220);
console.log("Server is running...");

