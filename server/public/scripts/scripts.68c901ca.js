"use strict";var app=angular.module("shareurfindingsApp",["ui.router","restangular","ui.tinymce","ngSanitize"]);app.config(function(){tinyMCE.baseURL="/tinymce",tinyMCE.suffix=".min"}),app.config(["$stateProvider","$urlRouterProvider",function(a,b){console.log("inside routes"),b.otherwise("/"),a.state("posts",{url:"/",templateUrl:"views/post/index.html",controller:"PostCtrl"}).state("edit",{url:"/post/:id/edit",templateUrl:"views/post/edit.html",controller:"PostEditCtrl"}).state("show",{url:"/post/:id",templateUrl:"views/post/show.html",controller:"PostEditCtrl"})}]),app.controller("PostCtrl",["$scope","Post","$stateParams",function(a,b){a.formData={},a.post={},a.posts=b.all().then(function(b){a.posts=b}),a.addPost=function(){b.create(a.post).then(function(b){a.posts=b.posts})},a.deletePost=function(c){b["delete"](c).then(function(b){a.posts=b.posts})}}]),app.controller("PostEditCtrl",["$scope","Post","Comment","$stateParams","$state",function(a,b,c,d,e){a.post={},b.show(d.id).then(function(b){a.post=b,a.post.tag_list=_.pluck(b.tags,"name")}),a.updatePost=function(){b.update(a.post).then(function(){e.go("posts",null,{reload:!0})})},a.addComment=function(){c.addComment(a.post).then(function(b){a.post.comments=b,a.post.comment=""})},a.deleteComment=function(b){c["delete"](b).then(function(b){a.post.comments=b})}}]),app.service("Post",["Restangular",function(a){var b=a.all("api/v1/posts");this.all=function(){return b.getList()},this.create=function(a){return b.post({posts:a})},this["delete"]=function(b){return a.one("api/v1/posts",b).remove()},this.update=function(a){var c={posts:a};return b.customPUT(c,a.id)},this.show=function(b){return a.one("api/v1/posts",b).get()},this.addRating=function(b){return a.all("api/v1/posts/add_rating").post({posts:b})}}]),app.service("Comment",["Restangular",function(a){var b=a.all("api/v1/comments");this.all=function(){return a.one("api/v1/get_comments",postId).get()},this.create=function(a){return b.post({posts:a})},this["delete"]=function(b){return a.one("api/v1/comments",b).remove()},this.update=function(a){var c={posts:a};return b.customPUT(c,a.id)},this.show=function(b){return a.one("api/v1/posts",b).get()},this.addComment=function(a){var c={commentable_id:a.id,comment:a.comment};return b.post({comment:c})}}]),app.directive("autoComplete",["$http",function(a){return{restrict:"AE",scope:{selectedTags:"=model"},templateUrl:"/views/autocomplete-template.html",link:function(b,c,d){b.suggestions=[],b.selectedIndex=-1,b.selectedTags=[],b.search=function(){a.get(d.url+"?term="+b.searchText).success(function(a){-1===a.indexOf(b.searchText)&&a.unshift(b.searchText),b.suggestions=a,b.selectedIndex=-1})},b.checkKeyDown=function(a){40===a.keyCode?(a.preventDefault(),b.selectedIndex+1!==b.suggestions.length&&b.selectedIndex++):38===a.keyCode?(a.preventDefault(),b.selectedIndex-1!==-1&&b.selectedIndex--):13===a.keyCode&&b.addToSelectedTags(b.selectedIndex)},b.addToSelectedTags=function(a){-1===b.selectedTags.indexOf(b.suggestions[a])&&(b.selectedTags.push(b.suggestions[a]),b.searchText="",b.suggestions=[])},b.$watch("selectedIndex",function(a){-1!==a&&(b.searchText=b.suggestions[b.selectedIndex])}),b.removeTag=function(a){b.selectedTags.splice(a,1)}}}}]),app.directive("rating",["Post",function(a){return{restrict:"AE",scope:{score:"=score",max:"=max",post_object:"=post"},templateUrl:"/views/rating.html",link:function(b){b.updateStars=function(){var a=0;for(b.stars=[],a=0;a<b.max;a+=1)b.stars.push({full:b.score>a})},b.starClass=function(a){var b="fa-star-o";return a.full&&(b="fa-star"),b},b.$watch("score",function(a){null!==a&&void 0!==a&&b.updateStars()}),b.setRating=function(c){b.score=c+1,b.post_object.average_score=b.score,a.addRating(b.post_object).then(function(a){b.score=a.average_score})},b.hover=function(a){b.hoverIdx=a},b.stopHover=function(){b.hoverIdx=-1},b.starColor=function(a,c){var d="rating-normal";return(a.full||c<=b.hoverIdx)&&(d="rating-highlight"),d}}}}]);