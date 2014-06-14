angular.module("app").factory 'AuthenticationService', ($http) ->
  login: (credentials) ->
    $http.post('/login', credentials)
  logout: ->
    $http.post('/logout')
