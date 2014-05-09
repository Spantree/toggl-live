'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var tasks = require('./tasks');
var accounts = require('./accounts');

var app = express();
app.use(bodyParser());


app.get('/', function(req, res, next){
  res.send("Go to '/api/currentTasks'");
});

app.get('/api/currentTasks', function(req, res, next){
  tasks.getAllTasks(accounts, function(err, data){
    res.json(data);
  });
});


app.listen(3000);

