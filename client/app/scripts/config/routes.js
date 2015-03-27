'use strict';

/**
 * All Routes
 * Listed here
 * Using angular-ui-router
 */

app.config(function ($stateProvider, $urlRouterProvider) {
    console.log('inside routes');
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('posts', {
      url:        '/',
      templateUrl: 'views/post/index.html',
      controller: 'PostCtrl'
    })

    .state('edit', {
      url:        '/post/:id/edit',
      templateUrl: 'views/post/edit.html',
      controller: 'PostEditCtrl'
    })

    .state('show', {
      url:        '/post/:id',
      templateUrl: 'views/post/show.html',
      controller: 'PostEditCtrl'
    })

  });

