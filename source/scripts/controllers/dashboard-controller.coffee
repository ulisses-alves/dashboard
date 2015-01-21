angular.module 'dashboard'
.controller 'DashboardController', ($scope, $timeout, getSettings) ->
  $scope.type = null
  $scope.url = null
  $scope.title = null

  appendUrlSeed = (url) ->
    time = new Date().getTime().toString()
    sym = if url.indexOf '?' < 0 then '?' else '&'
    "#{url}#{sym}seed#{time}=#{time}"

  begin = ->
    getSettings(cache: false).then (settings) ->
      duration = settings.duration ? 10000
      sourceList = settings.sources ? []
      sourceIndex = 0

      next = ->
        source = sourceList[sourceIndex++]

        unless source?
          $timeout begin, duration
          return

        $scope.type = source.type ? 'page'
        $scope.url = source.url
        $scope.title = source.title

        $timeout next, duration
        return

      next();

  begin();
  return
