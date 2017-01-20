var express = require('express');
var bodyParser = require('body-parser');
var sessions = require('express-session');

var session;

var app = express();
app.use('/cssFiles', express.static(__dirname+'/assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/signup', function(request, responce){
	
	responce.sendFile('signup.html',{ root: __dirname});

});

app.post('/signup', function(request, responce){
	//responce.end(JSON.stringify(req.body));
	responce.sendFile('Thankyou');
	//if(request.body.username== 'admin' && request.body.password == 'admin'){
		//session.uniqueID = request.body.username;
	//}
	//responce.redirect('/redirects');
});



app.listen(1337, function(){
	console.log('Listening. . . ');
});