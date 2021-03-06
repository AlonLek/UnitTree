/**
 * Created by hack on 27/09/2017.
 */
app.controller("PersonCardController", ["appData","$timeout", function (appData,$timeout) {
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
                self.closeCard();
                $timeout(function () {
                    appData.getAllData()
                        .then(function () {
                            appData.network.setData({
                                nodes: new vis.DataSet(appData.data.nodes),
                                edges: new vis.DataSet(appData.data.edges)
                            });
                        })
                },1000) });
    }

    self.querySearch = function(query) {
        var results = query ? appData.data.nodes.filter( self.createFilterFor(query) ).sort(compare) : self.removeSelfFromCommanders(appData.data.nodes).sort(compare);
        return results;
    }

    self.removeSelfFromCommanders = function(nodes)
    {
        var pos;
        for(var elm in nodes){
            if(nodes[elm].id == self.person.id){
                pos = elm;
            }
        }
        nodes.splice(pos, 1);
        return nodes;
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
            return (commander.label.indexOf(lowercaseQuery) === 0 && commander.id != self.person.id);
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