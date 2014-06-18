'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var tasks = require('./tasks');
var nconf = require('nconf');
var fs = require('fs');
var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;
var session = require('express-session');
var flash = require('connect-flash');
var _ = require('underscore');
var ensureAuthenticated = require('./ensureAuthenticated');

var accounts, PORT = 3000,
  USER_ACCOUNTS_FILE = process.env.HOME + '/.node-configs/user-admin.json';

var app = express();
app.use(bodyParser());
app.use(cookieParser('cookie secret'));
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(session());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.get('/', ensureAuthenticated, function(req, res, next){
  res.redirect('/index');
});

app.get('/index', ensureAuthenticated, function(req, res){
  res.render('index');
});

app.get('/api/tasks', ensureAuthenticated, function(req, res, next){
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
    res.json({
      tasks: formattedResponse,
      user: {name: req.user.displayName, email: _.first(req.user.emails).value}
    });
  });
});

passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(obj, done){
  done(null, obj);
});

passport.use(new GoogleStrategy({
  returnURL: 'http://localhost:3000/auth/google/return',
  realm: 'http://localhost:3000/'
},function(identifier, profile, done){
  profile.identifier = identifier;
  return done(null, profile);
}));

app.get('/login', function(req, res){
  if(req.user){
    res.redirect('/');
  } else {
    res.render('login');
  }
});

app.get('/auth/google', 
       passport.authenticate('google', {
         successRedirect: '/index',
         failureRedirect: '/login'
}));

app.get('/auth/google/return',
       passport.authenticate('google', {failureRedirect: '/login'}),
       function(req, res){
         res.redirect('/');
       }
);

app.listen(PORT, function(){
  console.log("Started server on port ", PORT);

  nconf.argv()
    .env()
    .file({file: USER_ACCOUNTS_FILE});
  accounts = nconf.get('user_accounts');

});

