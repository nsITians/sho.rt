var http = require('http');
var express = require('express');
var fs = require('fs');
var app = express();
var shortid = require('shortid');

//console.log(shortid.generate());
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.set('view engine','ejs');

console.log('Working now!')

app.get('/short',function(req,res){
  res.writeHead(200,{'Content-Type':'text/html'});
  //res.end('You are using sho.rt');
  var myInputStream = fs.createReadStream(__dirname + "/shortner.html");
  myInputStream.pipe(res);
});
app.post('/short/url',function(req,res){
  //res.writeHead(200,{'Content-Type':'text/plain'});
  //res.end('URL is : ' + req.body.mainurl_); URL as entered by the user
  var uid = shortid.generate();
  console.log(uid);
  uid = "localhost:5000/" + uid;
  res.render('uid',{uniqueid: uid});
  res.end("localhost:5000/" + uid); // generates unique ID and shortens the url.
  //console.log(req.body.mainurl);
});

app.get('/:uid',function(req,res){
  req.url="google.co.in";
  res.writeHead(301,
  {Location: 'https://google.co.in'}
  );
  res.end();
  console.log('Redirector');
});
app.listen(5000);
