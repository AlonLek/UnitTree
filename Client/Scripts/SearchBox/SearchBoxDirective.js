app.directive("SearchBox", function () {
    return {
        restrict: 'E',
        templateUrl: "./Scripts/SearchBox/SearchBox.html",
        controller: "SearchBoxController",
        controllerAs: "searchBoxCtrl",
        bindToController: true,
        scope: {
            query: '='
        },
    }
})

