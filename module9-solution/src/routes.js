(function () {
    'use strict';

    angular.module('MenuApp')
    .config(RoutesConfig);
    
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfig($stateProvider, $urlRouterProvider) {
        //Redirect to home if no other URL matches
        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('home', {
                url: '/',
                templateUrl: 'src/home.template.html'
            })
            .state('categories', {
                url: '/categories',
                templateUrl: 'src/categories.template.html',
                controller: 'CategoriesController as categoriesController',
                resolve: {
                    categories: ['MenuDataService', function(MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            .state('items', {
                url: '/items/{categoryShortName}',
                templateUrl: 'src/items.template.html',
                controller: 'ItemsController as itemsController',
                resolve: {
                    items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
                        return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                    }]
                }
            })
    }

})();