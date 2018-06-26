var express = require('express');

var app = express();

app.set('port',process.env.PORT || 3000);

//custom 404 page
app.use(function(request, response){
  response.type('text/plain');
  response.status(404);
  response.send('404 - Not found');
});

//custom 500 page
app.use(function(err,request,response,next){
  console.error(err.stack);
  response.type('text/plain');
  response.status(500);
  response.send('500 - Server Error');
});

//add some routes for the homepage and an about page
app.get('/', function(request, response){
  response.type('text/plain');
  response.send('Meadowlark Travel');
});

app.get('/about', function(){
  response.type('plain/text');
  response.send('About Meadowlark Travel');
})

app.listen(app.get('port'),function(){
  console.log('Express started on http://localhost:'+
  app.get('port')+ '; press Ctrl-C to terminate');
})
