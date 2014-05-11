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

app.get('/api/tasks', function(req, res, next){
  tasks.getAllTasks(accounts, function(err, data){
    var formattedResponse = data.map(function(item){
       var task = {id: item.name, name: item.name};
       if(item.currentTask){
          task['currentTask'] = item.currentTask;
       }
       return task;
    });
    res.json({tasks: formattedResponse});
  });
});


app.listen(3000);

