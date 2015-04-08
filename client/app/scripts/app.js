'use strict';

/**
 * @ngdoc overview
 * @name shareurfindingsApp
 * @description
 * # shareurfindingsApp
 *
 * Main module of the application.
 */
var app = angular.module('shareurfindingsApp', ['ui.router', 'restangular', 'ui.tinymce','ngSanitize']);
app.config(function() {
    tinyMCE.baseURL = '/tinymce';
    tinyMCE.suffix = '.min';
})