angular.module 'dashboard'
.controller 'DashboardController', ($scope, $q, $interval, getSettings) ->
  $scope.first = first = position: 'previous'
  $scope.second = second = position: 'current'
  $scope.third = third = position: 'next'

  begin = ->
    duration = 10000
    sources = []
    index = 0

    getNext = ->
      src = sources[index++]
      return $q.when src if src?

      getSettings(cache: false).then (settings) ->
        duration = settings.duration ? duration
        sources = settings.sources ? []
        index = 0
        getNext()

    refresh = ->
      getNext().then (source) ->
        [first.position, second.position, third.position] =
          [third.position, first.position, second.position]

        [first, second, third]
          .filter (x) -> x.position is 'next'
          .forEach (x) -> x.source = source

    refresh()
    $interval refresh, duration

  begin()
  return
