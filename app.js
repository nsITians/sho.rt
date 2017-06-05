/*
@Author: Manish Devgan
@Github: https://github.com/gabru-md
@Language: Javascript
*/

var http = require('http');
var express = require('express');
var fs = require('fs');
var app = express();
var shortid = require('shortid');
var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;



//console.log(shortid.generate());
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.set('view engine','ejs');

console.log('Working now!');
var url = 'mongodb://localhost:27017/database';

var link_db;
/*

add_link : function used to add
  the shorten link and the main url to 
  the database.
params:
  link - the original URL
  id - short id for the URL
  
*/
function add_link(link,id){

  var link_db = link;
  var id_db = id;
  MongoClient.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    else{
      //console.log('Connected to ',url);

      var collection = db.collection('uids');

      var obj = {link:link_db,id:id_db};

      collection.insert(obj,function(err,res){

        if(err){
          console.log(err);
        }
        else{
          console.log('%d Links Entered!', res.insertedCount);
        }
        db.close();
      });

      }
  });

}

/*

get_link : function to get the link 
  from the database.
  
params:
  uid - unique id for every link 
  that was generated before.
  request - request object
  resp - response object
  
*/
function get_link(uid,request,resp){

  var id_db = uid;
  MongoClient.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    else{
      //console.log('Connected to, ',url);

      var collection = db.collection('uids');

      collection.find({id:id_db}).toArray(function(err,res){
        if(err){
          console.log(err);
        }
        else if(res.length == 1){
          link_db = res[0]['link'];
          //console.log(JSON.stringify(link_db));
          //link_db = JSON.stringify(link_db);
          //link_db.replace(/"/g, '\'');
          console.log(String(link_db));
          resp.writeHead(302, {
            'Location': link_db
            //add other headers here...
          });
          resp.end();
          console.log("New URL: ",request.url);
          //console.log("BODY: ",request.body);
        }
        else{
          console.log('No such UID exists!');
          resp.writeHead(301,
          {Location: '/short/error404'}
          );
          link_db = 'NULL';
          resp.end();
        }
        db.close();
      });

    }

  });
}
app.get('/',function(req,res){
  console.log('Shortner Redirector');
  res.writeHead(301,
  {Location: 'http://localhost:5000/short'}
  );
  res.end();
});

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
  add_link(req.body.mainurl,uid);
  res.render('uid',{uniqueid: uid});
  res.end("localhost:5000/" + uid); // generates unique ID and shortens the url.
  //console.log(req.body.mainurl);
});


app.get('/:uid',function(req,res){
  //req.url="google.co.in";
  get_link("localhost:5000/" + req.params.uid,req,res);

  console.log('Redirector');
});


app.get('/short/error404',function(req,res){
  console.log('Error Page!');
  res.writeHead(200,{'Content-Type':'text/html'});
  var myInputStream = fs.createReadStream(__dirname + "/error.html");
  myInputStream.pipe(res);
});


app.listen(5000);
