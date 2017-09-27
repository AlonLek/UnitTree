/**
 * Created by hack on 27/09/2017.
 */
app.controller("UnitTreeController", ["$http", "appData", function ($http, appData) {
    var self = this;

    self.chosenNode = null;
    self.editNewPerson = false;

    self.toggleEditCard = function () {
        self.editNewPerson = !self.editNewPerson;
    }
    appData.getAllDAta()
        .then(function (data) {
            var options = {
                layout: {
                    hierarchical: true
                }
            }

            // create a network
            var container = document.getElementById('unitTree');

            // provide the data in the vis format
            var tree = {
                nodes: new vis.DataSet(data.data.nodes),
                edges: new vis.DataSet(data.data.edges)
            }

            // initialize your network!
            var network = new vis.Network(container, tree, options);

            network.on("selectNode", function (params) {
                if (params.nodes.length === 1) {
                    var node = params.nodes[0];

                    appData.getById(node)
                        .then(function (nodeData) {
                            self.chosenNode = nodeData;
                        })
                        .catch();
                }
            });
        })
        .catch();
}]);