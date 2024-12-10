(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['UserService', 'MenuService'];

function MyInfoController(UserService, MenuService) {
  var myInfoCtrl = this;

  myInfoCtrl.user = UserService.getUser();

  if(myInfoCtrl.user && myInfoCtrl.user.favoriteDish) {
    MenuService.getMenuItem(myInfoCtrl.user.favoriteDish).then(function (response) {
      console.log(response);
      myInfoCtrl.menuItem = response;
      console.log(myInfoCtrl.menuItem);
    });

    myInfoCtrl.imagePath = MenuService.getMenuItemImagePath(myInfoCtrl.user.favoriteDish);
  }
}

})();
