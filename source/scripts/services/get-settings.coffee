angular.module 'dashboard'
.provider 'getSettings', ->
  settingsPath = null

  @path = (path) ->
    settingsPath = path
    this

  @$get = ($http) ->
    class getSettings
      constructor: (options) ->
        config = angular.extend { cache: true }, options
        return $http.get(settingsPath, config).then (res) ->
          angular.extend {}, res.data

  return
