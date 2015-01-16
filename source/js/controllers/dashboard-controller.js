angular.module('dashboard')
.controller('DashboardController', function($scope, $interval, getSettings) {
  $scope.type = null;
  $scope.url = null;

  var appendUrlSeed = function appendUrlSeed(url) {
    var time = new Date().getTime().toString();
    var seed = 'seed' + time + '=' + time;
    var sym = url.indexOf('?') >= 0 ? '&' : '?';
    return url + sym + seed;
  };

  var initilize = function initilize(settings) {
    var sourceList = settings.sources;

    if (!sourceList || !sourceList.length) return;

    var delay = settings.duration || 10000;
    var sourceIndex = 0;
    var sourceIntervalId = null;
    var refreshIntervalId = null;

    var nextSource = function() {
      $interval.cancel(refreshIntervalId);

      if (sourceIndex >= sourceList.length) sourceIndex = 0;
      var source = sourceList[sourceIndex++];

      $scope.type = source.type || 'page';
      $scope.url = source.url;

      if (source.refresh) {
        refreshIntervalId = $interval(function() {
          $scope.url = appendUrlSeed(source.url);
        }, source.refresh);
      }
    };

    nextSource();
    sourceIntervalId = $interval(nextSource, delay);

    $scope.$on('$destroy', function() {
      $interval.cancel(sourceIntervalId);
      $interval.cancel(refreshIntervalId);
    });
  };

  getSettings().then(initialize);
});
