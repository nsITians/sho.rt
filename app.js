var http = require('http');
var express = require('express');
var fs = require('fs');
var app = express();
var shortid = require('shortid');

//console.log(shortid.generate());
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var server = http.createServer(function(req,res){
  res.writeHead(200,{'Content-Type':'text/plain'});
  res.end('Hey ninjas');
});

server.listen(5000,'127.0.0.1');
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
app.listen(5000);
