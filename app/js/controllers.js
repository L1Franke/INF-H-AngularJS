'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('PizzaListCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {

    $http.get('pizzas/pizzas.json').success(function(data) {
        $scope.pizzas = data;
        var temp = [];
        angular.forEach($scope.pizzas, function(pizza) {
            angular.forEach(pizza.allergens, function (allergen) {
                temp.push(allergen);
            });
        });
        $scope.allergens = $filter('orderBy')($filter('unique')(temp));
    });

    $scope.searchOptions = [{ label: "naam", value: "name" }, { label: "ingrediënt", value: "ingredients" }];
    $scope.selectedSearchOption = $scope.searchOptions[0];

    $scope.allergenSelection = [];

    $scope.toggleAllergenSelection = function toggleSelection(allergen) {
        var idx = $scope.allergenSelection.indexOf(allergen);
        if (idx > -1) {
            $scope.allergenSelection.splice(idx, 1);
        }else {
            $scope.allergenSelection.push(allergen);
        }
    };

    $scope.containsAllergen = function(pizza) {
        angular.forEach(pizza.allergens, function(allergen) {
            if ($scope.allergenSelection.indexOf(allergen) !== -1) {
                console.log("Contains " + allergen )
                return false;
            }
        });
        return true;
    };

}]);