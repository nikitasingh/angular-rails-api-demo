'use strict';

/**
 * @ngdoc function
 * @name shareurfindingsApp.controller:MainCtrl
 * @description
 * Controller of the shareurfindingsApp
 */
app.controller('CommentCtrl', function ($scope,Post,Comment,$stateParams) {
    $scope.DeletePost = function (id) {
      Comment.delete(id).then(function(comments) {
        $scope.post.comments = comments
      });
    }
  });
