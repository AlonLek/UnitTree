/**
 * Created by hack on 27/09/2017.
 */
app.controller("AddNewPersonController", [function () {
    var self = this;
    self.person = {};

    self.closeCard = function () {
        self.editNewPerson = false;
    }
}]);