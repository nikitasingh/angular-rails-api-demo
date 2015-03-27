'use strict';

app.service('Comment', function Comment(Restangular) {

    var baseUrl = Restangular.all('api/v1/comments');

    this.all = function(post_id){
    	return Restangular.one('api/v1/get_comments', postId).get();
    }

    this.create = function(params){
    	return baseUrl.post({posts: params});
    }

    this.delete = function(id){
      return Restangular.one("api/v1/comments", id).remove();
    }

    this.update = function(post){
      var params = {posts: post}
      return baseUrl.customPUT(params, post.id);
    }

    this.show = function(id){
      return Restangular.one('api/v1/posts',id).get();
    }

    this.addComment = function(post){
      var params = {commentable_id: post.id, comment: post.comment}
      return baseUrl.post({comment: params});
    }
  });
