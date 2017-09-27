/**
 * Created by hack on 27/09/2017.
 */
app.controller("PersonCardController", ["appData",function (appData) {
    var self = this;

    self.closeCard = function () {
        self.person = null;
    }
    
    self.deletePerson = function (person) {
        appData.deleteById(person.id)
            .then(function () {
                self.person = null;

                appData.getAllData()
                    .then(function (data) {
                        appData.network.setData({
                            nodes: new vis.DataSet(data.data.nodes),
                            edges: new vis.DataSet(data.data.edges)
                        });
                    })
            })
            .catch();
    }
}]);