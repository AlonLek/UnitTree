/**
 * Created by hack on 27/09/2017.
 */
app.controller("PersonCardController", ["appData", function (appData) {
    var self = this;
    self.isEdited = false;

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

    self.editPerson = function () {
        self.isEdited = true;
    }

    self.savePerson = function () {
        appData.updateData(self.person)
            .then(function () {
                appData.getAllData()
                    .then(function (data) {
                        appData.network.setData({
                            nodes: new vis.DataSet(data.data.nodes),
                            edges: new vis.DataSet(data.data.edges)
                        });
                    })
            });
    }

    self.cencelUpdate = function () {
        self.isEdited = false;
    }
}]);