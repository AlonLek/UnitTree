/**
 * Created by hack on 27/09/2017.
 */
app.directive("unitTree", function () {
    return {
        restrict: 'EA',
        templateUrl: "./Scripts/UnitTree/UnitTree.html",
        controller: "UnitTreeController",
        controllerAs: "unitTreeCtrl"
    }
})