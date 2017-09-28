/**
 * Created by hack on 27/09/2017.
 */
app.controller("PersonCardController", ["appData", function (appData) {
    var self = this;
    self.isEdited = false;
    self.commander = {};

    self.closeCard = function () {
        self.person = null;
    }

    self.deletePerson = function (person) {
        appData.deleteById(person.id)
            .then(function () {
                self.person = null;

                appData.getAllData()
                    .then(function () {
                        appData.network.setData({
                            nodes: new vis.DataSet(appData.data.nodes),
                            edges: new vis.DataSet(appData.data.edges)
                        });
                    })
            })
            .catch();
    }

    self.editPerson = function () {
        self.isEdited = true;
    }

    self.savePerson = function () {
        self.person.parent = self.person.selectedParent.id;
        appData.updateData(self.person)
            .then(function () {
                appData.getAllData()
                    .then(function () {
                        appData.network.setData({
                            nodes: new vis.DataSet(appData.data.nodes),
                            edges: new vis.DataSet(appData.data.edges)
                        });
                        self.closeCard();
                    })
            });
    }

    self.querySearch = function(query) {
        var results = query ? appData.data.nodes.filter( self.createFilterFor(query) ) : appData.data.nodes;
        return results;
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
        if(item && item.parentName){
            item.label = item.parentName;
        }
        if(item !== undefined){
            item.parentName = item.label;
        }
    }

    self.cencelUpdate = function () {
        self.isEdited = false;
    }
}]);