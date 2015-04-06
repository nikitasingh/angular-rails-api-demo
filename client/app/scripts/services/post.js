'use strict';

app.service('Post', function Post(Restangular) {

    var baseUrl = Restangular.all('api/v1/posts');
    this.all = function(){
    	return baseUrl.getList();
    }

    this.create = function(params){
    	return baseUrl.post({posts: params});
    }

    this.delete = function(id){
      return Restangular.one("api/v1/posts", id).remove();
    }

    this.update = function(post){
      var params = {posts: post}
      return baseUrl.customPUT(params, post.id);
    }

    this.show = function(id){
      return Restangular.one('api/v1/posts',id).get();
    }

    this.addRating = function(post){
      return Restangular.all('api/v1/posts/add_rating').post({posts: post});
    }

  });
