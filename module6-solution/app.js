(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckerController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
    
function LunchCheckController($scope) {
    $scope.message = "";
    $scope.lunchText = "";

    $scope.checkLunch = function () {
        $scope.message = checkIfTooMuch($scope.lunchText);
    }

    function checkIfTooMuch(lunchText) {
        if (lunchText.length === 0){
            return "Please enter data first!"
        }

        var items = lunchText.split(',')
            .filter(item => item.trim() !== '');

        if (items.length <= 3){
            return "Enjoy!";
        }
        else {
            return "Too Much!";
        }

    }
};

})();