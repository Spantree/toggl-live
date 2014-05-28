'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var tasks = require('./tasks');
var nconf = require('nconf');
var fs = require('fs');

var accounts, PORT = 3000,
  USER_ACCOUNTS_FILE = process.env.HOME + '/.node-configs/user-admin.json';

var app = express();
app.use(bodyParser());


app.get('/', function(req, res, next){
  res.send("Go to '/api/tasks'");
});

app.get('/api/tasks', function(req, res, next){
  tasks.getAllTasks(accounts, function(err, data){
    var formattedResponse = data.map(function(item){
      var task = {id: item.name, name: item.name};
      if(item.currentTask){
        task['currentTask'] = item.currentTask;
      }
      if(item.currentProject){
        task['currentProject'] = item.currentProject;
      }
      return task;
    });
    res.json({tasks: formattedResponse});
  });
});


app.listen(PORT, function(){
  console.log("Started server on port ", PORT);

  nconf.argv()
    .env()
    .file({file: USER_ACCOUNTS_FILE});
  accounts = nconf.get('user_accounts');

});

