var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var express = require('express');

app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('', function(req, res){

  console.log('Name (from visible form field): ' + req.body.name);
  res.send(req.body.name);
  
});




http.listen(3000, function(){
  console.log('listening on *:3000');
});
