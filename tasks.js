var request = require('request');
var keys = require('./keys');

function printTasks(err, response, body){
   if(err){
      return console.log("Error print tasks: ", err);
   }
   console.log("GOT DATA: ", JSON.parse(body).data.description);
   console.log("Start Time: ", JSON.parse(body).data.start);
}


request({
   method: 'GET',
   uri: 'https://www.toggl.com/api/v8/time_entries/current',
   'auth':{
      'user': keys.user,
      'pass': 'api_token'
   }
   }, printTasks);


//Get username
// then => get task

function getUserDetails(key){
};
