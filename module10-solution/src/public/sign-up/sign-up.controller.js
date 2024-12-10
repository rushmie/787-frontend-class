(function () {
  "use strict";

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['UserService', 'MenuService'];

  function SignUpController(UserService, MenuService) {
    var signUpCtrl = this;

    var user = UserService.getUser();

    signUpCtrl.user = user;

    if (user != undefined) {
      signUpCtrl.firstName = user.firstName;
      signUpCtrl.lastName = user.lastName;
      signUpCtrl.phone = user.phone;
      signUpCtrl.email = user.email;
      signUpCtrl.favoriteDish = user.favoriteDish;
    }

    signUpCtrl.signUp = function () {
      var user = {
        firstName: signUpCtrl.firstName,
        lastName: signUpCtrl.lastName,
        phone: signUpCtrl.phone,
        email: signUpCtrl.email,
        favoriteDish: signUpCtrl.favoriteDish
      };

      if (signUpCtrl.favoriteDish) {
        var result = this.validateFavoriteDish();
        if (result == null) {
          return;
        }
      }

      UserService.setUser(user);
      signUpCtrl.infoSaved = true;

    }

    signUpCtrl.validateFavoriteDish = function () {
      if (!signUpCtrl.favoriteDish || signUpCtrl.favoriteDish === "") {
        signUpCtrl.favoriteDishError = "Favorite dish is required.";
        return null;
      }

      MenuService.getMenuItem(signUpCtrl.favoriteDish).then(function (response) {
        console.log(response);
        if (response == null) {
          signUpCtrl.favoriteDishError = "No such menu number exists.";
          return null;
        } 
        else {
          signUpCtrl.favoriteDishError = ""; // Clear error if valid
        }
      });
    }
  };
})();
