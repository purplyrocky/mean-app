(function () {

  'use strict';

  angular.module('app')
    .controller('ProjectsController', function (projects, Projects, $modal, $state, $rootScope) {
      var vm = this;
      vm.projects = projects;
      vm.remove = Projects.del;

      /* Adding a new project */
      vm.addProject = function addProject(project) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/projects/new.html',
          controller: 'NewProjectCtrl',
          controllerAs: 'newProject',
          size: 'md'
        }).result.then(function (res) {
            Projects.post(res);
          });
      };
    });
}());