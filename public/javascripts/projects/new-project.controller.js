(function () {
  'use strict';

  angular.module('app')
    .controller('NewProjectCtrl', function ($scope, $modalInstance, Users){
      var vm = this;
      vm.users = Users.users;
      vm.project = {user: ''};
      


      vm.close = function close(){
        $modalInstance.close(vm.project);

      };

      vm.dismiss = function dismiss(){
        $modalInstance.dismiss();
      };

    });
}());