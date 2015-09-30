
(function () {
  'use strict';
  angular.module('app')
    .controller('BodyController', function(Projects){
      var vm = this;
      vm.welcome = 'Sup';
      
      Projects.get()
        .then(function(projects) {
          vm.projects = Projects.projects;
	});
    });
}());
