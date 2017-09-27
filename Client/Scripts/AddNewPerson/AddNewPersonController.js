/**
 * Created by hack on 27/09/2017.
 */
app.controller("AddNewPersonController", ["appData", function (appData) {
    var self = this;
    self.person = {};

    self.addNewPerson = function () {

    }

    function querySearch (query) {
        var results = query ? appData.data.nodes.filter( createFilterFor(query) ) : appData.data.nodes,
            deferred;
        if (self.simulateQuery) {
            deferred = $q.defer();
            $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
            return deferred.promise;
        } else {
            return results;
        }
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(commander) {
            return (commander.label.indexOf(lowercaseQuery) === 0);
        };

    }

    self.closeCard = function () {
        self.editNewPerson.isEdited = false;
    }
}]);