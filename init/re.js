/*
  @Author : Manish Devgan
  @Github : https://github.com/gabru-md
  @Language : Javascript
*/
var express = require('express')

var app = express();
// A very simple Redirector in JS

/*
UID is a parameter that will
determine the ID of hash.

This ID will be used to point
to the actual URL in mongoDB.
*/

app.get('/:uid',function(req,res){
  req.url="google.co.in";
  res.writeHead(301,
  {
    Location: 'https://google.co.in'}
  );
  res.end();
  console.log('Redirector');
});

