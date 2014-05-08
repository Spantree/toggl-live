var request = require('request');
var accounts = require('./accounts');
var _ = require('underscore');
var through = require('through');
var Readable = require('stream').Readable;

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
  getHttp(TASK_DETAILS_URL + "" + user.tid, user.key, cb);
}


/*
 * gets current tasks for all users
 * @return a list of users with their current tasks.
 * E.g.: [{name: 'Jon Doe', taskId: 1231}, {name: 'Jane Doe'}]
 */
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

/**
 * @returns [{name: 'Jon Doe', task: 'Something'}]
 */
function tasksDetailsStream(tasks){
  var self = this ;
  var tasksWithId = _.filter(JSON.parse(tasks.toString()), function(task){
    return !_.isUndefined(task.taskId) && !_.isNull(task.taskId);
  });
  var tasksWithNoId = _.filter(JSON.parse(tasks.toString()), function(task){
    return _.isUndefined(task.taskId);
  });
  _.each(tasksWithId, function(task){
    fetchTaskDetails(task, function(err, taskDetails){
      self.queue(JSON.stringify({name: task.name, currentTask: JSON.parse(taskDetails).data.name}));
    });
  });
  _.each(tasksWithNoId, function(task){
    self.queue(JSON.stringify({name: task.name}));
  });
}

currentTasksStream(accounts, function(error, currentTasks){
  var readableStream = new Readable();
  _.each(currentTasks, function(it){
    console.log(it);
    readableStream.push(JSON.stringify(it));
  });
  readableStream.push(null);
  readableStream.pipe(through(tasksDetailsStream)).pipe(process.stdout);
});



