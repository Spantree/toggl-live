var request = require('request');
var keys = require('./keys');

function printUser(err, response, body){
   if(err){
      return console.log("Error getting user: ", err);
   }
   console.log("User: ", JSON.parse(body).data.fullname);
};

request({
   method: 'GET',
   uri: 'https://www.toggl.com/api/v8/me',
   'auth':{
      'user': keys.user,
      'pass': 'api_token'
   }
}, printUser);


