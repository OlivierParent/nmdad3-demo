/**
 * @author    Olivier Parent
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () { 'use strict';

    // Module declarations
    var app = angular.module('app', [
        'ionic',
        'ngCordova',
        // Modules
        'app.camera',
        'app.services'
    ]);
    angular.module('app.camera', []);
    angular.module('app.services', []);

    app.run(function($ionicPlatform) {
        $ionicPlatform.ready(whenReady);

        function whenReady() {
            console.log('read');
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs).
            // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
            // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
            // useful especially with forms, though we would prefer giving the user a little more room
            // to interact with the app.
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }

            if (window.StatusBar) {
                // Set the statusbar to use the default style, tweak this to
                // remove the status bar on iOS or change it to use white instead of dark colors.
                StatusBar.styleDefault();
            }
        }
    });

})();

/**
 * @author    Olivier Parent
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () { 'use strict';

    angular.module('app')
        .config(Config);
        
    // Inject dependencies into constructor (needed when JS minification is applied).
    Config.$inject = [
        // Angular
        '$compileProvider',
        '$httpProvider'
    ];

    function Config(
        // Angular
        $compileProvider,
        $httpProvider
    ) {
        // Allow 'app:' as protocol (for use in Hybrid Mobile apps)
        $compileProvider
            .aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|app):/)
            .imgSrcSanitizationWhitelist(/^\s*((https?|ftp|file|app):|data:image\/)/)
        ;

        // Enable CORS (Cross-Origin Resource Sharing)
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }

})();

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
/**
 * @author    Olivier Parent
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () { 'use strict';

    angular.module('app.camera')
        .controller('CameraCtrl', CameraCtrl);

    // Inject dependencies into constructor (needed when JS minification is applied).
    CameraCtrl.$inject = [
        // Angular
        '$log',
        // Ionic
        '$ionicPlatform',
        // ngCordova
        '$cordovaCamera'
    ];

    function CameraCtrl(
        // Angular
        $log,
        // Ionic
        $ionicPlatform,
        // ngCordova
        $cordovaCamera
    ) {
        // ViewModel
        // =========
        var vm = this;

        vm.getPhoto = getPhoto;
        vm.lastPhoto = 'no photo';

        // Functions
        // =========
        function getPhoto() {
            var cameraOptions = {
                quality: 75,
                targetWidth: 320,
                targetHeight: 320,
                saveToPhotoAlbum: false
            };

            $cordovaCamera
                .getPicture(cameraOptions)
                .then(getPhotoSuccess, getPhotoError);
        }
        
        function getPhotoSuccess(imageUri) {
            $log.log(imageUri);
            vm.lastPhoto = imageUri;
        }

        function getPhotoError(error) {
            $log.error(error);
            vm.lastPhoto = 'error';
        }

    }

})();
