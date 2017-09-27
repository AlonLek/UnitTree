/**
 * Created by hack on 27/09/2017.
 */
app.controller("UnitTreeController", [function () {
    $.ajax({
        method: "get",
        url: "http://10.10.247.135:8080/data",
        success: function (data) {

            var options = {
                layout:{
                    hierarchical: true
                }
            }

            // create a network
            var container = document.getElementById('unitTree');

            // provide the data in the vis format
            var tree = {
                nodes: new vis.DataSet(data.nodes),
                edges: new vis.DataSet(data.edges)
            }

            // initialize your network!
            var network = new vis.Network(container, tree, options);
        },
        error: function () {

        }
    });
}]);