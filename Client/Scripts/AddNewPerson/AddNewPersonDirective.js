/**
 * Created by hack on 27/09/2017.
 */
app.directive("addNewPerson", function () {
    return {
        restrict: 'EA',
        templateUrl: "./Scripts/AddNewPerson/AddNewPerson.html",
        scope: {
            editNewPerson: '='
        },
        replace:true,
        controller: "AddNewPersonController",
        controllerAs: "AddNewPersonCtrl",
        bindToController: true
    }
})