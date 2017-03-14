(function() {
    // MISC OTHER 
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(document.body);
        }, false);
    }


    // ANGULAR 
    var app = angular.module("gunslinger", ["ui.router"]);

    // Interceptor
    var interceptor = function($q, $timeout, $rootScope, $log) {
        return {
            request: function(config) {
                // request stuff
                $rootScope.loading = true;
                return config;
            },
            response: function(result) {
                // result
                $rootScope.loading = false;
                return result;
            },
            responseError: function(rejection) {
                $log.error("Failed with ", rejection.status, 'status');
                $rootScope.loading = false;
                $rootScope.rejection = rejection;
                return $q.reject(rejection);
            }
        };
    };

    app.factory('QueueService', function($rootScope) {
        var queue = new createjs.LoadQueue(true);

        function loadManifest(manifest) {
            queue.loadManifest(manifest);

            queue.on('progress', function(event) {
                $rootScope.$broadcast('queueProgress', event);
            });

            queue.on('complete', function() {
                $rootScope.$broadcast('queueComplete', manifest);
            });
        }

        return {
            loadManifest: loadManifest
        }
    });

    // App Run
    app.run([
        '$rootScope', '$state', '$stateParams',
        function($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            console.log(Cookies.get('vpf-loaded'));
            if (!Cookies.get('vpf-loaded')) {
                $state.go('loading');
            } else {
                $state.go('hello');
            }
        }
    ]);
    // App Config
    app.config([
        "$httpProvider", "$stateProvider",
        "$urlRouterProvider", "$locationProvider",
        function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
            $httpProvider.defaults.useXDomain = true;
            $httpProvider.defaults.withCredentials = true;
            $httpProvider.interceptors.push(interceptor);
            var templatePath = 'scripts/app/';
            // $locationProvider.html5Mode(true);


            // state/routes
            $urlRouterProvider.otherwise("hello");

            $stateProvider
                .state('loading', {
                    url: '/loading',
                    templateUrl: templatePath + 'loading/loading.html',
                    onEnter: function($state) {

                        var i = 0,
                            iOS = false,
                            iDevice = ['iPad', 'iPhone', 'iPod'];
                        for (; i < iDevice.length; i++) {
                            if (navigator.platform === iDevice[i]) { iOS = true; break; }
                        }

                        if (!iOS) {
                            function startHandler(e) {
                                if (!e) {
                                    e = window.event;
                                }
                            };

                            function endedHandler(e) {
                                if (!e) {
                                    e = window.event;
                                }
                                $('#filmleader').remove();
                                Cookies.set('vpf-loaded', true);
                                $state.transitionTo('hello');
                            };

                            function handleFileComplete(event) {
                                var loading = $('.loading');
                                $(loading).append(event.result);
                                $(loading).find('video').attr('id', 'filmleader');
                                $('#filmleader').get(0).play();
                                $('#filmleader').bind('playing', startHandler);
                                $('#filmleader').bind('ended', endedHandler);
                            };


                            var preload = new createjs.LoadQueue(false);
                            preload.addEventListener("fileload", handleFileComplete);
                            preload.loadFile(window.rootPath + "images/leaderHD.mp4");

                        } else {
                            $('#filmleader').remove();
                            //Cookies.set('vpf-loaded', true);
                            $state.transitionTo('hello');
                        }
                    }
                })
                .state('hello', {
                    url: '/hello',
                    views: {
                        '': {
                            templateUrl: templatePath + 'hello/landingpage.html',
                            controller: 'helloController'
                        }
                    },
                    onEnter: function($state, $timeout) {

                        if (!Cookies.get('vpf-loaded')) {
                            $state.go('loading');
                        } else {
                            $timeout(function() {
                                window.Hello();
                                window.Menu();
                            }, 500);
                        }
                    }
                })
                .state('about', {
                    url: '/about',
                    views: {
                        '': {
                            template: '<div class="about-vpf"><p id="msg1">{{msg1}}</p><p id="msg2">{{msg2}}</p></div>',
                            controller: function($scope) {
                                $scope.msg1 = "";
                                $scope.msg2 = "We make nice things for the web, mobile and print.";
                            }
                        }
                    },
                    onEnter: function($state, $timeout) {

                        if (!Cookies.get('vpf-loaded')) {
                            $state.go('loading');
                        } else {
                            $timeout(function() {
                                window.About();
                                window.Menu();
                            }, 500);
                        }
                    }
                })
                .state('work', {
                    url: '/work',
                    views: {
                        '': {
                            template: '<div class="work-vpf"><p id="workMsg"></h1></div>',
                            controller: function($scope) {
                                $scope.msg = '';
                            }
                        }
                    },
                    onEnter: function($state, $timeout) {

                        if (!Cookies.get('vpf-loaded')) {
                            $state.go('loading');
                        } else {
                            $timeout(function() {
                                window.Work();
                                window.Menu();
                            }, 500);
                        }
                    }
                })
                .state('blog', {
                    url: '/blog',
                    views: {
                        '': {
                            template: '<h3>Blog {{msg}}</h3>',
                            controller: function($scope) {
                                $scope.msg = "blooooooog controller";
                            }
                        }
                    },
                    onEnter: function($state, $timeout) {

                        if (!Cookies.get('vpf-loaded')) {
                            $state.go('loading');
                        } else {
                            $timeout(function() {
                                window.Blog();
                            }, 500);
                        }
                    }
                })
                .state('contact', {
                    url: '/contact',
                    views: {
                        '': {
                            templateUrl: "Templates/contact.html",
                            controller: function($scope) {
                                //$scope.msg = "contact controller";
                            }
                        }
                    },
                    onEnter: function($state, $timeout) {

                        if (!Cookies.get('vpf-loaded')) {
                            $state.go('loading');
                        } else {
                            $timeout(function() {
                                window.Contact();
                            }, 500);
                        }
                    }
                })

            // work 
            // blog 
            // contact

            //end app config
        }
    ]);

}());