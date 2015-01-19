angular.module 'dashboard'
.provider 'getSettings', ->
  @path = (@settingsPath) ->

  @$get = ($http) ->
    promise = $http.get @settingsPath
    class getSettings
      constructor: ->
        return promise.then (res) ->
          angular.extend {}, res.data

  return
