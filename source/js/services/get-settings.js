angular.module('dashboard')
.provider('getSettings', function() {
  var _path;

  this.path = function(path) {
    _path = path;
    return this;
  };

  this.$get = function($http) {
    var promise = $http.get(_path);

    return function() {
      return promise.then(function(res) {
        return angular.extend({}, res.data);
      });
    }
  };
});
