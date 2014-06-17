(function() {
  'use strict';  angular.module("app", ["ngResource", "ngRoute"]).run(function($rootScope) {
    $rootScope.log = function(thing) {
      return console.log(thing);
    };
    $rootScope.alert = function(thing) {
      return alert(thing);
    };
    return console.log("Starting app...");
  });

}).call(this);

(function() {
  angular.module("app").controller("BooksController", function($scope, BookResource) {
    return $scope.books = BookResource.query();
  });

}).call(this);

(function() {
  angular.module("app").controller('HomeController', function($scope, $location, AuthenticationService) {
    var onLogoutSuccess;

    $scope.title = "Home";
    $scope.message = "Mouse Over these images to see a directive at work";
    onLogoutSuccess = function(response) {
      return $location.path('/login');
    };
    return $scope.logout = function() {
      return AuthenticationService.logout().success(onLogoutSuccess);
    };
  });

}).call(this);

(function() {
  angular.module("app").controller('LoginController', function($scope, $location, AuthenticationService) {
    var onLoginSuccess;

    $scope.credentials = {
      username: "",
      password: ""
    };
    onLoginSuccess = function() {
      return $location.path('/home');
    };
    return $scope.login = function() {
      return AuthenticationService.login($scope.credentials).success(onLoginSuccess);
    };
  });

}).call(this);

(function() {
  angular.module("app").directive("showsMessageWhenHovered", function() {
    return function(scope, element, attributes) {
      var originalMessage;

      originalMessage = scope.message;
      element.bind("mouseenter", function() {
        scope.message = attributes.message;
        return scope.$apply();
      });
      return element.bind("mouseleave", function() {
        scope.message = originalMessage;
        return scope.$apply();
      });
    };
  });

}).call(this);

(function() {
  angular.module("app").factory("BookResource", function($q, $resource) {
    return $resource('/books');
  });

}).call(this);

(function() {
  angular.module("app").config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.when('/login', {
      templateUrl: 'login.html',
      controller: 'LoginController'
    });
    $routeProvider.when('/home', {
      templateUrl: 'home.html',
      controller: 'HomeController'
    });
    $routeProvider.when('/list-of-books', {
      templateUrl: 'books.html',
      controller: 'BooksController'
    });
    return $routeProvider.otherwise({
      redirectTo: '/home'
    });
  });

}).call(this);

(function() {
  angular.module("app").factory('AuthenticationService', function($http) {
    return {
      login: function(credentials) {
        return $http.post('/login', credentials);
      },
      logout: function() {
        return $http.post('/logout');
      }
    };
  });

}).call(this);

(function() {
  angular.module("app").factory("BookService", function($q, $http) {
    var getBooks;

    getBooks = function() {
      return $http.get('/books');
    };
    return {
      getBooks: getBooks
    };
  });

}).call(this);
