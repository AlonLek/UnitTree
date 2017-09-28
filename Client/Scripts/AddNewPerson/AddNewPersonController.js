/**
 * Created by hack on 27/09/2017.
 */
app.controller("AddNewPersonController", ["appData", "$timeout", function (appData, $timeout) {
    var self = this;
    self.person = {commander: null};
    self.searchText = "";

    self.addNewPerson = function () {
        if(self.person.commander != null)
            self.person.parent = self.person.commander.id;
        appData.addNewPerson(self.person)
            .then(function () {
                $timeout(function () {
                    appData.getAllData()
                        .then(function () {
                            appData.network.setData({
                                nodes: new vis.DataSet(appData.data.nodes),
                                edges: new vis.DataSet(appData.data.edges)
                            });
                            self.closeCard();
                        })
                }, 1000);
            });
    }

    self.querySearch = function (query) {
        results = query ? appData.data.nodes.filter( self.createFilterFor(query)).sort(compare) : appData.data.nodes.sort(compare);
        return results;
    }

    function compare(a,b) {
        if (a.label.toUpperCase() < b.label.toUpperCase())
            return -1;
        if (a.label.toUpperCase() > b.label.toUpperCase())
            return 1;
        return 0;
    }

    /**
     * Create filter function for a query string
     */
    self.createFilterFor = function(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(commander) {
            return (commander.label.indexOf(lowercaseQuery) === 0);
        };
    }

    self.selectedItemChange = function (item) {
        if(item !== undefined){
            self.person.parentName = item.label;
        }
    }

    self.closeCard = function () {
        self.editNewPerson.isEdited = false;
    }
}]);