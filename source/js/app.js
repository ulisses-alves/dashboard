angular.module('dashboard', ['ngRoute'])
.config(function($routeProvider, $sceProvider, getSettingsProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'tmpl/dashboard.html',
    controller: 'DashboardController'
  })
  .otherwise({
    redirectUrl: '/'
  });

  $sceProvider.enabled(false);

  getSettingsProvider.path('data/dashboard.json');
});
