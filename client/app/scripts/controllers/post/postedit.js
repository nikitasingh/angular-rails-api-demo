'use strict';

/**
 * @ngdoc function
 * @name shareurfindingsApp.controller:MainCtrl
 * @description
 * Controller of the shareurfindingsApp
 */
app.controller('PostEditCtrl', function ($scope,Post,Comment,$stateParams,$state) {
    $scope.post = {};
    Post.show($stateParams.id).then(function(data) {
      $scope.post = data;
      $scope.post.tag_list = _.pluck(data.tags, 'name');
    });

    $scope.updatePost = function(id){
      Post.update($scope.post).then(function(data) {
        $state.go('posts', null, { reload: true });
      });
    };

    $scope.addComment = function(id){
      Comment.addComment($scope.post).then(function(data) {
        $scope.post.comments = data;
        $scope.post.comment = "";
      });
    };

    $scope.deleteComment = function (id) {
      Comment.delete(id).then(function(comments) {
        $scope.post.comments = comments;
      });
    }
  });
