var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var sessions = require('express-session');

var session;

var app = express();
app.use('/cssFiles', express.static(__dirname+'/assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(sessions({
	secret: '@#$%',
	resave: false,
	saveUninitialized: false
}))

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/login');

var Schema = new mongoose.Schema({
       name: String,
       password: String,
       mail: String
});


var user = mongoose.model('emp', Schema);

app.get('/login', function(request, responce){
	session = request.session;
	if(session.uniqueID){
		responce.redirect('/redirects');

	}
	responce.sendFile('login.html',{ root: __dirname});

});


app.get('/signup', function(request, responce){
	
	responce.sendFile('signup.html',{ root: __dirname});

});


app.post('/login', function(request, responce){
	//responce.end(JSON.stringify(req.body));
	session = request.session;
	if(session.uniqueID){
		responce.redirect('/redirects');
	}
	//if(request.body.username== 'admin' && request.body.password == 'admin'){
		session.uniqueID = request.body.username;
	//}
	
    if((user.find({name:"request.body.username",password: "request.body.password"}).count()))
	{
		//console.log(user.find({name:request.body.username,password: request.body.password}).count());
		responce.send('You have successfully logged in');
	}
	else //if((user.find({name:request.body.username,password: request.body.password}).count())==0)
	{
        console.log('Wrong password');	
        responce.send('Wrong password or User not exists');
	}
	
	//
});


app.post('/signup', function(request, responce){
	//responce.end(JSON.stringify(req.body));
	//responce.send('Thankyou')
	new user({
		name:request.body.username,
        password: request.body.password,
        mail: request.body.email
        
	}).save(function(err, doc){
		if(err) responce.json(err);
		else responce.redirect('/thankyou');
	});
	//responce.send('Thankyou <a href="/login">Go to Login Page</a>');
});

/*app.get('/fetch', function(request, responce){
	user.find({name:""}, function(err, docs){

		if(err) responce.json(err);
		else responce.send('Wow');
	});
});*/

app.get('/thankyou', function(request, responce){
	responce.send('Thankyou <a href="/login">Go to Login Page</a>');
});

app.get('/logout', function(request, responce){
	/*request.session.destroy(function(error){
		console.log('error');
		responce.redirect('/login');
	})*/
	request.session.destroy();
	responce.redirect('/login');
});

app.get('/cancel', function(request, responce){
      responce.send('Thankyou');
});

app.get('/redirects', function(request, responce){
	session = request.session;
	if(session.uniqueID== 'admin'){
		console.log(session.uniqueID);
		responce.redirect('/admin');
	} 
	 else{
		responce.send(request.session.uniqueID+ " "+ 'not found <a href="/logout">KILL SESSION</a>');
	}
});

app.get('/admin', function(request, responce){
	if(session.uniqueID != 'admin'){
		responce.send('Unauthorized access');
	}

      responce.send('You are the God. <a href="/logout">KILL SESSION</a>');
	
});

app.listen(1337, function(){
	console.log('Listening. . . ');
});