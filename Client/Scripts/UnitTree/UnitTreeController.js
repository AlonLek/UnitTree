/**
 * Created by hack on 27/09/2017.
 */
app.controller("UnitTreeController", ["$http", function ($http) {
    var self = this;

    $http.get("http://10.10.247.136:8080/data")
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

                    $http.get("http://10.10.247.136:8080/data?id=" + node)
                        .then(function (nodeData) {
                            console.log(nodeData.data.name);
                        }).catch(function () {

                    });
                }
            });
        })
        .catch(function () {

        })
}]);