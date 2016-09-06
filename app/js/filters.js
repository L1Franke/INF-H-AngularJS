'use strict';

/* Filters */
var appFilters = angular.module('appFilters', []);

appFilters.filter('unique', function() {
    return function(input) {
        if (typeof input == 'undefined'){return;}
        var unique = {};
        var uniqueList = [];
        for(var i = 0; i < input.length; i++){
            if(typeof unique[input[i]] == "undefined"){
                unique[input[i]] = "";
                uniqueList.push(input[i]);
            }
        }
        return uniqueList;
    };
});

appFilters.filter('allergenFilter', function() {
    return function(pizzas, allergens) {
        var filtered = [];

        if(allergens === undefined || allergens === ''){
            return pizzas;
        }

        angular.forEach(pizzas, function(pizza) {
            var found = false;
            angular.forEach(pizza.allergens, function (allergen) {
                if (!found) {
                    if (allergens.indexOf(allergen) !== -1) {
                        console.log("Contains " + allergen)
                        found = true;
                    }
                }
            });
            if (!found) {
                filtered.push(pizza);
            }
        });

        return filtered;
    };
});
