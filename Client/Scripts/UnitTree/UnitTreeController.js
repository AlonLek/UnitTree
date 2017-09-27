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
                    hierarchical: {
                        sortMethod: 'directed'   // hubsize, directed
                    }
                },
                physics: false
            };

            // create a network
            var container = document.getElementById('unitTree');

            // provide the data in the vis format
            var tree = {
                nodes: new vis.DataSet(data.data.nodes),
                edges: new vis.DataSet(data.data.edges)
            };

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

            // var forrest = getRelevantNodesForest({nodes: data.data.nodes, edges: data.data.edges}, "4");
            // network.setData({
            //     nodes: new vis.DataSet(forrest.nodes),
            //     edges: new vis.DataSet(forrest.edges)
            // });

        })
        .catch();
}]);

/***
 *
 * @param tree: object of type {nodes:[], edges:[]}
 * @param label: string
 * @returns {{nodes: Array, edges: Array}}
 */
var getBloodLineByLabel = function (tree, label) {
    var nodes = [];
    var edges = [];
    var targetNode = findNodeBylabel(tree, label);
    var currNode = targetNode;
    var parentNode;

    while (currNode !== undefined) {
        nodes.push(currNode);
        parentNode = findNodeById(tree, currNode.parentId);
        if (parentNode !== undefined)
            edges.push({from: parentNode.id, to: currNode.id});
        currNode = parentNode;
    }

    return {
        nodes: nodes,
        edges: edges
    };
}

/***
 *
 * @param tree: object of type {nodes:[], edges:[]}
 * @param node
 * @returns {{nodes: Array, edges: Array}}
 */
var getBloodLine = function (tree, node) {
    var nodes = [];
    var edges = [];
    var currNode = node;
    var parentNode;

    while (currNode !== undefined) {
        nodes.push(currNode);
        parentNode = findNodeById(tree, currNode.parentId);
        if (parentNode !== undefined)
            edges.push({from: parentNode.id, to: currNode.id});
        currNode = parentNode;
    }

    return {
        nodes: nodes,
        edges: edges
    };
}

var findNodeById = function(tree, id) {
    for (index in tree.nodes) {
        var node = tree.nodes[index];
        if (node.id === id)
            return node;
    }

    return undefined;
}

var findNodeBylabel = function(tree, label) {
    for (index in tree.nodes) {
        var node = tree.nodes[index];
        if (node.label === label)
            return node;
    }

    return undefined;
}

var findNodeChildren = function(tree, id) {
    children = [];

    for (index in tree.edges) {
        var edge = tree.edges[index];
        if (edge.From === id)
            children.push(findNodeById(edge.To));
    }

    return children;
}

var getRelevantNodes = function(tree, query) {
    var nodes = [];

    for (index in tree.nodes) {
        var node = tree.nodes[index];
        if(node.label.indexOf(query) !== -1)
            nodes.push(node);
    }

    return nodes;
}

var getRelevantNodesForest = function(tree, query) {
    var relevantNodes = getRelevantNodes(tree, query);

    if(relevantNodes.length === 0)
        return {
            nodes: [],
            edges: []
        }

    var currTree = getBloodLine(tree, relevantNodes[0]);

    for (index in relevantNodes) {
        var node = relevantNodes[index];
        currTree = unifyTrees(currTree, getBloodLine(tree, node));
    }

    return currTree;
}

var unifyTrees = function(tree1, tree2) {
    return {
        nodes: unifyNodesArrays(tree1.nodes, tree2.nodes),
        edges: unifyEdgesArrays(tree1.edges, tree2.edges)
    }
}

var unifyArrays = function(arr1, arr2, containsFunc) {
    var unifiedArr = []

    unifiedArr = unifiedArr.concat(arr1);

    for (index in arr2) {
        var element = arr2[index];
        if (!containsFunc(unifiedArr, element))
            unifiedArr.push(element);
    }

    return unifiedArr;
}

var unifyNodesArrays = function(arr1, arr2) {
    return unifyArrays(arr1, arr2, containsNode)
}

var unifyEdgesArrays = function(arr1, arr2) {
    return unifyArrays(arr1, arr2, containsEdge)
}

var contains = function(arr, element) {
    return arr.indexOf(element) !== -1;
}

var containsNode = function(nodes, node) {
    for(index in nodes)
        if(nodes[index].id === node.id)
            return true;
    return false;
}

var containsEdge = function(edges, edge) {
    for(index in edges)
        if(edges[index].from === edge.from && edges[index].to === edge.to)
            return true;
    return false;
}
