/**
 * Created by hack on 27/09/2017.
 */
app.factory("appData", ["$q", "$http", function ($q, $http) {
    var appData = {};

    appData.getAllDAta = function () {
        var deferred = $q.defer();
        $http.get("http://10.10.247.136:8080/allData")
            .then(function (data) {
                deferred.resolve(data);
            });
        return deferred.promise;
    };

    appData.getById = function (id) {
        var deferred = $q.defer();
        $http.get("http://10.10.247.136:8080/dataById?id=" + id)
            .then(function (nodeData) {
                deferred.resolve(nodeData.data);
            });
        return deferred.promise;
    }

    return appData;
}]);