angular.module("app").controller "BooksController", ($scope, BookResource) ->
  $scope.books = BookResource.query()

