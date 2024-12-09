(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['UserService'];

function SignUpController(UserService) {
  var signUpCtrl = this;

  var user = UserService.getUser();
  if(user != undefined) {
    signUpCtrl.firstName = user.firstName;
    signUpCtrl.lastName = user.lastName;
    signUpCtrl.phone = user.phone;
    signUpCtrl.email = user.email;
    signUpCtrl.favoriteDish = user.favoriteDish;

  }

  signUpCtrl.signUp = function() {
    var user = {
      firstName: signUpCtrl.firstName, 
      lastName: signUpCtrl.lastName, 
      phone: signUpCtrl.phone, 
      email: signUpCtrl.email,
      favoriteDish: signUpCtrl.favoriteDish
    };

    UserService.setUser(user);
    signUpCtrl.infoSaved = true;
    
  }
}

})();
