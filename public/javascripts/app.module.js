(function () {
  'use strict';

  angular.module('app', ['ui.router', 'app.ui', 'ui.bootstrap'])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

      $urlRouterProvider.otherwise('/projects');

      $stateProvider
        .state('login', {
          url:'/login',
          templateUrl: 'partials/login/index.html',
          controller: 'LoginController',
          controllerAs: 'loginController'
        })

        .state('projects', {
          url: '/projects',
          templateUrl: 'partials/projects/index.html',
          controller: 'ProjectsController',
          controllerAs: 'projectsController',
          resolve: {
            projects: function (Projects, users) {
              //returns a promise, controller is called when promise is resolved
              return Projects.get();
            },

            users: function (Users) {
              return Users.get();
            }

          },

          data: {
            requiresLogin: true
          }

        })

        .state('projects.detail', {
          url: '/:projectId',
          templateUrl: 'partials/projects/detail.html',
          controller: 'ProjectController',
          controllerAs: 'projectController',
          resolve: {
            project: function (Projects, $stateParams, projects) {
              return Projects.find($stateParams.projectId);
            }
          },

          data: {
            requiresLogin: true
          }

        })

        .state('projects.detail.edit', {
          url: '/edit',
          templateUrl: 'partials/projects/edit.html',
          controller: 'ProjectEditController',
          controllerAs: 'projectEditController',
          data: {
            requiresLogin: true
          }
        });
    
      $httpProvider.interceptors.push(function ($injector) {
        return {
          request: function (config) {
            var Users = $injector.get('Users');
            if (Users.isLoggedIn()) config.headers.Authorization = 'Token ' + Users.currentUserToken;
            return config;
          }
        };
      });
    })

    .run(function ($rootScope, Users, $state) {
      $rootScope.$on('$stateChangeStart', function (event, toState) {
        if (toState.data && toState.data.requiresLogin) {
          if (!Users.isLoggedIn()) {
            event.preventDefault();
            $state.go('login');
          }
        }
      });
    });

}());
