var request = require('request');
var keys = require('./keys');
var _ = require('underscore');

var CURRENT_URL = 'https://www.toggl.com/api/v8/time_entries/current',
   USER_DETAILS_URL = 'https://www.toggl.com/api/v8/me';


function getHttp(uri, key, cb){
   request({
      method: 'GET',
      uri: uri,
      'auth':{
         'user': key,
         'pass': 'api_token'
      }
   }, cb);
};

function getUserDetails(key, cb){
   getHttp(USER_DETAILS_URL, key, cb);
};

function getCurrentTask(key, cb){
   getHttp(CURRENT_URL, key, cb);
};


function fetchAllCurrentTasks(usersKeys, cb){
   var currentTasks = [];
   var returnTasks = _.after(usersKeys.length, cb);
   _.each(usersKeys, function(key){
      getUserDetails(key.user, function(err, response, body){
         var user = {fullname: JSON.parse(body).data.fullname};
         console.log("user: ", JSON.parse(body).data.fullname);
         getCurrentTask(key.user, function(err, response, body){
            if(JSON.parse(body).data){
               currentTasks.push({user: user, task: JSON.parse(body).data.description});
               console.log("Current Task: ", JSON.parse(body).data.description);
            } else {
               currentTasks.push({user: user});
               console.log("No Current Task");
            }
            returnTasks(null, currentTasks);
         });
      });
   });
};

fetchAllCurrentTasks(keys, function(error, currentTasks){
   console.log("TASKS:::::: ", currentTasks);
});

