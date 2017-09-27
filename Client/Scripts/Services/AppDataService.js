/**
 * Created by hack on 27/09/2017.
 */
app.service("appData", ["$q", "$http", function ($q, $http) {
    var self = this;
    self.data = [];

    self.network = null;

    self.getAllData = function () {
        var deferred = $q.defer();
        $http.get("http://localhost:8080/allData")
            .then(function (data) {
                self.data = data.data;
                deferred.resolve(data);
            });
        return deferred.promise;
    };

    self.getById = function (id) {
        var deferred = $q.defer();
        $http.get("http://localhost:8080/dataById?id=" + id)
            .then(function (nodeData) {
                deferred.resolve(nodeData.data);
            });
        return deferred.promise;
    }

    self.deleteById = function (id) {
        var deferred = $q.defer();
        $http.get("http://localhost:8080/DeleteData?id=" + id)
            .then(function () {
                deferred.resolve();
            });
        return deferred.promise;
    }
    
    self.addNewPerson = function (person) {
        var deferred = $q.defer();
        $http.put("http://localhost:8080/InsertData?name=" + person.name + "&parentId=" + person.personId)
            .then(function () {
                deferred.resolve();
            });
        return deferred.promise;
    }

    self.updateData = function (person) {
        var deferred = $q.defer();
        $http.put("http://localhost:8080/InsertData?name=" + person.name + "&parentId=" + person.personId)
            .then(function () {
                deferred.resolve();
            });
        return deferred.promise;
    }
}]);