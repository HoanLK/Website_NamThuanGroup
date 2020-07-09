function Config($compileProvider, $httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
    'ngInject';

    $compileProvider.debugInfoEnabled(false);
    $httpProvider.useApplyAsync(1000);

    $locationProvider.html5Mode(false).hashPrefix('!');
    $urlRouterProvider.otherwise('/');
}

export default Config