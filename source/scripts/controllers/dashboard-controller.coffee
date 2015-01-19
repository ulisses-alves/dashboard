angular.module 'dashboard'
.controller 'DashboardController', ($scope, $interval, getSettings) ->
  $scope.type = null;
  $scope.url = null;

  appendUrlSeed = (url) ->
    time = new Date().getTime().toString()
    sym = if url.indexOf '?' < 0 then '?' else '&'
    "#{url}#{sym}seed#{time}=#{time}"

  initialize = (settings) ->
    sourceList = settings.sources
    return unless sourceList and sourceList.length

    delay = settings.duration ? 10000
    sourceIndex = 0
    sourceIntervalId = null
    refreshIntervalId = null

    nextSource = ->
      $interval.cancel refreshIntervalId
      sourceIndex = 0 unless sourceIndex < sourceList.length
      source = sourceList[sourceIndex++]

      $scope.type = source.type ? 'page'
      $scope.url = source.url

      refreshIntervalId = $interval(
        -> $scope.url = appendUrlSeed source.url
        source.refresh
      ) if source.refresh

      return

    nextSource()
    sourceIntervalId = $interval nextSource, delay

    $scope.$on '$destroy', ->
      $interval.cancel sourceIntervalId
      $interval.cancel sourceRefreshId

    return

  getSettings().then initialize
  return
