app.directive("rating", function(Post) {
    return {
    restrict: 'AE',
    scope:{
            score: '=score',
    				max: '=max',
    				post_object:'=post'
        },
    templateUrl:'/views/rating.html',

    link: function(scope, $element, attrs) {
    	scope.updateStars = function() {
			  var idx = 0;
			  scope.stars = [];
			  for (idx = 0; idx < scope.max; idx += 1) {
			    scope.stars.push({
			      full: scope.score > idx
			    });
			  }
			};

			scope.starClass = function(star, idx) {
			  var starClass = 'fa-star-o';
			  if (star.full) {
			    starClass = 'fa-star';
			  }
			  return starClass;
			};

			scope.$watch('score', function(newValue, oldValue) {
			  if (newValue !== null && newValue !== undefined) {
			    scope.updateStars();
			  }
			});

			scope.setRating = function(idx) {
			  scope.score = idx + 1;
			  scope.post_object.average_score = scope.score ;
			  Post.addRating(scope.post_object).then(function(object) {
        scope.score = object.average_score;
      })
			};

			scope.hover = function(idx) {
			  scope.hoverIdx = idx;
			};

			scope.stopHover = function() {
			  scope.hoverIdx = -1;
			};

			scope.starColor = function(star, idx) {
			  var starClass = 'rating-normal';
			  if (star.full || idx <= scope.hoverIdx) {
			   starClass = 'rating-highlight'; 
			  }
			  return starClass;
			};
  }
}
});