/**
 * Created by hack on 27/09/2017.
 */
app.controller("PersonCardController", [function () {
    var self = this;

    self.closeCard = function () {
        self.person = null;
    }
}]);