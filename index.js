var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var express = require('express');

app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/send_save', function(req, res) {
  console.log(req.body.name)
  res.contentType('json');
  res.send({ some: JSON.stringify({response:'json'}) });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
