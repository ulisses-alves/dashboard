angular.module 'dashboard'
.controller 'DashboardController', ($scope, $timeout, getSettings) ->
  $scope.type = null
  $scope.url = null
  $scope.title = null

  begin = ->
    getSettings(cache: false).then (settings) ->
      duration = settings.duration ? 10000
      sourceList = settings.sources ? []
      sourceIndex = 0

      next = ->
        source = sourceList[sourceIndex++]

        return begin() unless source?

        $scope.type = source.type ? 'page'
        $scope.url = source.url
        $scope.title = source.title

        $timeout next, duration
        return

      next();

  begin();
  return
