angular.module 'dashboard'
.directive 'dbSrcRefresh', ($timeout, urlHelper) ->
  link: (scope, element, attrs) ->
    lastRefresh = new Date()

    refresh = ->
      src = urlHelper.appendSeed attrs.dbSrcRefresh
      attrs.$set 'src', src
      lastRefresh = new Date()
      return

    scheduleRefresh = ->
      timespan = (new Date()) - lastRefresh
      minTime = attrs.dbSrcRefreshMin ? 1000
      $timeout refresh, Math.max(minTime - timespan, 0)
      return

    element.bind 'load', scheduleRefresh
    element.bind 'error', scheduleRefresh

    refresh()
    return
