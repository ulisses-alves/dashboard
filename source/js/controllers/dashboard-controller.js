angular.module('dashboard')
.controller('DashboardController', function($scope, $interval, $sce, getSettings) {
  $scope.type = null;
  $scope.url = null;

  var createSeedArg = function() {
    var time = new Date().getTime().toString();
    return 'seed' + time + '=' + time;
  };

  getSettings().then(function(settings) {
    var sources = settings.sources;

    if (!sources || !sources.length) return;

    var delay = settings.duration || 10000;
    var index = 0;
    var refreshInterval;

    var onInterval = function() {
      $interval.cancel(refreshInterval);

      if (index >= sources.length) index = 0;
      var source = sources[index++];

      $scope.type = source.type || 'page';
      $scope.url = source.url;

      if (source.refresh) {
        refreshInterval = $interval(function() {
          $scope.url += source.url.indexOf('?') ? '&' : '?';
          $scope.url += createSeedArg();
        }, source.refresh);
      }
    };

    onInterval();
    var sourceInterval = $interval(onInterval, delay);

    $scope.$on('$destroy', function() {
      $interval.cancel(sourceInterval);
      $interval.cancel(refreshInterval);
    });
  });
});
