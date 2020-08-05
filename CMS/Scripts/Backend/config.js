function Config(
  $compileProvider,
  $httpProvider,
  $stateProvider,
  $urlRouterProvider,
  $locationProvider,
  $sceDelegateProvider
) {
  "ngInject";

  $compileProvider.debugInfoEnabled(false);
  $httpProvider.useApplyAsync(1000);

  $locationProvider.html5Mode(false).hashPrefix("!");
  $urlRouterProvider.otherwise("/");

  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    "self",
    // Allow loading from our assets domain. **.
    "https://drive.google.com/**",
  ]);
}

export default Config;
