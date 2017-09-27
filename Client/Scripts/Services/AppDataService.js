/**
 * Created by hack on 27/09/2017.
 */
app.factory("appData", ["$q", "$http", function ($q, $http) {
    var appData = {};

    appData.network = null;

    appData.getAllData = function () {
        var deferred = $q.defer();
        $http.get("http://localhost:8080/allData")
            .then(function (data) {
                deferred.resolve(data);
            });
        return deferred.promise;
    };

    appData.getById = function (id) {
        var deferred = $q.defer();
        $http.get("http://localhost:8080/dataById?id=" + id)
            .then(function (nodeData) {
                deferred.resolve(nodeData.data);
            });
        return deferred.promise;
    }

    appData.deleteById = function (id) {
        var deferred = $q.defer();
        $http.get("http://localhost:8080/DeleteData?id=" + id)
            .then(function (nodeData) {
                deferred.resolve();
            });
        return deferred.promise;
    }

    return appData;
}]);