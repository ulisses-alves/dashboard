angular.module 'dashboard', ['ngRoute']
.config ($routeProvider, $sceProvider, getSettingsProvider) ->
  $routeProvider
    .when '/',
      templateUrl: 'templates/dashboard.html',
      controller: 'DashboardController'
    .otherwise
      redirectTo: '/'

  $sceProvider.enabled false
  getSettingsProvider.path 'data/dashboard.json'
  return
