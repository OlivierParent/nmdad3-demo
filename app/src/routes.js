/**
 * @author    Olivier Parent
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () { 'use strict';

    angular.module('app')
        .config(Routes);
        
    // Inject dependencies into constructor (needed when JS minification is applied).
    Routes.$inject = [
        // Angular
        '$stateProvider',
        '$urlRouterProvider'
    ];

    function Routes(
        // Angular
        $stateProvider,
        $urlRouterProvider
    ) {
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/index.view.html'
            })
            .state('camera', {
                url: '/camera',
                templateUrl: 'templates/camera.view.html'
            });
        $urlRouterProvider.otherwise('/');
    }

})();