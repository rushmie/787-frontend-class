(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.filter('angularDollars', AngularDollarsFilter);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
    
function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    
    toBuy.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

    toBuy.addBoughtItem = function (itemIndex) {
        ShoppingListCheckOffService.buyItem(itemIndex);
    }

    
};

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;

    alreadyBought.boughtItems = ShoppingListCheckOffService.getBoughtItems();

    alreadyBought.getTotalPrice = function (item) {
        return item.quantity * item.pricePerItem;
    }
}

function ShoppingListCheckOffService() {
    var service = this;

    var toBuyItems = [
        {name: "jar(s) of olives", quantity: 10, pricePerItem: 0.1 },
        {name: "bell pepper(s)", quantity: 6, pricePerItem: 1.99 },
        {name: "mushroom(s)", quantity: 5, pricePerItem: 0.5 },
        {name: "jar(s) of pesto", quantity: 1, pricePerItem: 4.30 },
        {name: "box(es) of pasta", quantity: 2, pricePerItem: 3.99 },
        {name: "tomato(es)", quantity: 4, pricePerItem: 0.25 },
    ];

    var boughtItems = [];

    service.buyItem = function (itemIndex) {
        // Validate selected quantity
        if (toBuyItems[itemIndex].quantity === 0 || toBuyItems[itemIndex].quantity === null || isNaN(toBuyItems[itemIndex].quantity)){
            return;
        }
        
        // add to bought
        boughtItems.push(toBuyItems[itemIndex]);

        // remove from toBuy
        toBuyItems.splice(itemIndex, 1);
    };

    service.getBoughtItems = function () {
        return boughtItems;
    }

    service.getToBuyItems = function () {
        return toBuyItems;
    }
}

function AngularDollarsFilter() {
    return function(input) {
        return '$$$' + input.toFixed(2);
    }
}

})();