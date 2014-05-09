'use strict';
var request = require('request');
var accounts = require('./accounts');
var _ = require('underscore');

var CURRENT_URL = 'https://www.toggl.com/api/v8/time_entries/current',
  USER_DETAILS_URL = 'https://www.toggl.com/api/v8/me',
  TASK_DETAILS_URL = 'https://www.toggl.com/api/v8/tasks/';


function getHttp(uri, key, cb){
   request({
      method: 'GET',
      uri: uri,
      'auth':{
         'user': key,
         'pass': 'api_token'
      }
   }, cb);
}

function getCurrentTask(key, cb){
   getHttp(CURRENT_URL, key, cb);
}

function fetchTaskDetails(user, cb){
  getHttp(TASK_DETAILS_URL + "" + user.user.tid, user.user.key, cb);
}

function fetchDetails(tasks, callback){
  var _tasks = JSON.parse(tasks);
  var cb = _.after(_tasks.length, callback);
  var results = [];
  _tasks.forEach(function(task){
    fetchTaskDetails(task, function(err, response, taskDetails){
      results.push(JSON.stringify({name: task.user.name, currentTask: JSON.parse(taskDetails).data.name}));
      cb(null, results);
    });
  });
}

function currentTasksStream(usersAccounts, cb){
  var currentTasks = [];
  var returnTasks = _.after(usersAccounts.length, cb);
  _.each(usersAccounts, function(userAccount){
    getCurrentTask(userAccount.key, function(err, response, body){
      if(!err){
        if(JSON.parse(body).data && JSON.parse(body).data.tid){
          currentTasks.push({user: {name: userAccount.name, key: userAccount.key, tid: JSON.parse(body).data.tid}});
          returnTasks(null, currentTasks);
        } else {
          currentTasks.push({user: {name: userAccount.name, key: userAccount.key}});
          returnTasks(null, currentTasks);
        }
      }
    });
  });
}


function joinTasks(idle, busy){
  var idleUsers = _.values(idle);
  idleUsers.forEach(function(idleUser){
    busy.push({name: idleUser.user.name});
  });
  return busy;
}


function getAllTasks(userAccounts, cb){
  currentTasksStream(userAccounts, function(err, userTasks){
    var idleUsers = _.filter(userTasks, function(it){
      return _.isUndefined(it.user.tid);
    });
    var busyUsers = _.difference(userTasks, idleUsers);
    if(busyUsers.length > 0){
      fetchDetails(JSON.stringify(busyUsers), function(err, currentTasks){
        cb(null, joinTasks(idleUsers, currentTasks));
      });
    } else {
        cb(null, joinTasks(idleUsers, []));
    }
  });
}

/*
getAllTasks(accounts, function(err, data){
  console.log("TASKS: ", data);
});
*/

module.exports = {
  getAllTasks: getAllTasks
};
