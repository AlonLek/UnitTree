/**
 * Created by hack on 27/09/2017.
 */
app.directive("personCard", function () {
    return {
        restrict: 'EA',
        templateUrl: "./Scripts/PersonCard/PersonCard.html",
        scope: {
            person: '=',
        },
        replace:true,
        controller: "PersonCardController",
        controllerAs: "personCardCtrl",
        bindToController: true
    }
})