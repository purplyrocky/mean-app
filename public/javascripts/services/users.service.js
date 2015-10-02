(function () {
  'use strict';

  angular.module('app')
    .service('Users', function ($http, User, $state){
      var vm = this;

      vm.currentUser = null;

      vm.currentUserToken = null;

      vm.users = [];

      vm.find = function find(userId) {
        return _.find(vm.users, {_id: userId});
      };

      //get users from the database
      vm.get = function get() {
        return $http.get('/users')
          .then(function (res) {
            vm.users.splice(0);

            res.data.forEach(function (user) {
              vm.users.push(new User(user));
            });

            return vm.users;
          });
      };

      vm.login = function login(creds) {
        return $http.post('/login', creds)
          .then(function (res) {
            vm.currentUser = res.data.user;
            vm.currentUserToken = res.data.token;
          });
      };

      vm.isLoggedIn = function isLoggedIn() {
        return !!vm.currentUser;
      };

    });
}());