(function () {
    'use strict';
    angular.module('MenuApp')
    .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['categories'];

    function CategoriesController() {
        var categoriesController = this;
        
        categoriesController.categories = categories;
    }

})();