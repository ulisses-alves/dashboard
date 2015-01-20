angular.module 'dashboard'
.controller 'DashboardController', ($scope, $timeout, getSettings) ->
  $scope.type = null;
  $scope.url = null;

  appendUrlSeed = (url) ->
    time = new Date().getTime().toString()
    sym = if url.indexOf '?' < 0 then '?' else '&'
    "#{url}#{sym}seed#{time}=#{time}"

  begin = ->
    getSettings(cache: false).then (settings) ->
      duration = settings.duration ? 10000
      sourceList = settings.sources ? []
      sourceIndex = 0
      refreshId = null;

      next = ->
        $timeout.cancel(refreshId)
        source = sourceList[sourceIndex++]

        unless source?
          $timeout(begin, duration)
          return

        refresh = source.refresh ? false

        update = ->
          $scope.type = source.type ? 'page'
          $scope.url = appendUrlSeed(source.url)
          refreshId = $timeout(update, refresh) if refresh

        update()
        $timeout(next, duration)
        return

      next();
      return
    return

  begin();
  return
