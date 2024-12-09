(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['UserService'];

function SignUpController(UserService) {
  var $ctrl = this;

  var user = UserService.getUser();
  if(user) {
    $ctrl.firstName = user.firstName;
    $ctrl.lastName = user.lastName;
    $ctrl.phone = user.phone;
    $ctrl.email = user.firstName;
    $ctrl.favoriteDish = user.firstName;

  }

  $ctrl.signUp = function() {
    const user = {
      firstName: $ctrl.firstName, 
      lastName: $ctrl.lastName, 
      phone: $ctrl.phone, 
      email: $ctrl.email,
      favoriteDish: $ctrl.favoriteDish
    };

    UserService.setUser(user);
    $ctrl.infoSaved = true;
    
  }
}

})();
