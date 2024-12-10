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
        var fav = MenuService.getMenuItem(signUpCtrl.favoriteDish);
        if (!fav) {
          // If dish is not valid, mark form invalid and show error
          signUpCtrl.favoriteDishError = "No such menu number exists.";
          return;
        }
      }
      else {
        // If no input is provided
        signUpCtrl.favoriteDishError = "Favorite dish is required.";
        return;
      }

      // If favoriteDish is valid, clear the error message
      signUpCtrl.favoriteDishError = "";

      UserService.setUser(user);
      signUpCtrl.infoSaved = true;

    }
  }

})();
