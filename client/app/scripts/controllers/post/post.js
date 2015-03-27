'use strict';

/**
 * @ngdoc function
 * @name shareurfindingsApp.controller:MainCtrl
 * @description
 * Controller of the shareurfindingsApp
 */
app.controller('PostCtrl', function ($scope,Post,$stateParams) {
    $scope.formData = {};
    $scope.post = {};
    $scope.posts = Post.all().then(function(posts) {
      $scope.posts = posts
    });
    $scope.addPost = function () {
      Post.create($scope.post).then(function(project) {
        $scope.posts = project.posts
      });
    }

    $scope.deletePost = function (id) {
      Post.delete(id).then(function(project) {
        $scope.posts = project.posts
      });
    }

  });
