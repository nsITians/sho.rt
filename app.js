/*
  @Author : Manish Devgan
  @Github : https://github.com/gabru-md
  @Language : Javascript
*/

var http = require('http');
var express = require('express');
var fs = require('fs');
var app = express();

var shortid = require('shortid');

//console.log(shortid.generate());
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


/*
  Simple test to create a server
*/

var server = http.createServer(function(req,res){
  res.writeHead(200,{'Content-Type':'text/plain'});
  res.end('Hey There!');
});

server.listen(5000,'127.0.0.1');
// server working on port 5000 of localhost

console.log('Working now!')

app.get('/short',function(req,res){
  res.writeHead(200,{'Content-Type':'text/html'});
  //res.end('You are using sho.rt');
  var myInputStream = fs.createReadStream(__dirname + "/shortner.html");
  myInputStream.pipe(res);
});

app.post('/url',function(req,res){
  res.writeHead(200,{'Content-Type':'text/plain'});
  //res.end('URL is : ' + req.body.mainurl_); URL as entered by the user
  res.end("localhost:5000/" + shortid.generate()); // generates unique ID and shortens the url.
  console.log(req.body.mainurl);
});

/*
  Funcion below will be the 
  redirector function for 
  out URL-Shortner.
  
  Below is a temporary snippet. 
  It will be replaced as soon as 
  mongoDB is connected to it.
*/

app.get('/:uid',function(req,res){
  req.url="google.co.in";
  res.writeHead(301,
  {Location: 'https://google.co.in'}
  );
  res.end();
  console.log('Redirector');
});

app.listen(5000);
