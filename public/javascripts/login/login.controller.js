(function () {

  'use strict';

  angular.module('app')
    .controller('LoginController', function (Users) {
      var vm = this;
      vm.creds = {};
      vm.login = Users.login;
    });
}());