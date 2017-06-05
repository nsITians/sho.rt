/*
  @Author : Manish Devgan
  @Github : https://github.com/gabru-md
  @Language : Javascript
*/

// A very simple Redirector in JS
app.get('/:uid',function(req,res){
  req.url="google.co.in";
  res.writeHead(301,
  {Location: 'https://google.co.in'}
  );
  res.end();
  console.log('Redirector');
});

