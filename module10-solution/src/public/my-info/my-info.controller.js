(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['UserService', 'MenuService', 'ApiPath'];

function MyInfoController(UserService) {
  var myInfoCtrl = this;

  myInfoCtrl.user = UserService.getUser();

  if(myInfoCtrl.user && myInfoCtrl.user.favoriteDish) {
    myInfoCtrl.menuItem = MenuService.getMenuItem(user.favoriteDish);
  }

  myInfoCtrl.apiPath = ApiPath;
}

})();
