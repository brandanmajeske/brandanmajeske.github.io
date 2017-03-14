(function () {
    var logo = document.getElementsByClassName("logo");
    var landing = document.getElementsByClassName("landing");
    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;

    //GSAP stuff here....
    $(window).load(function () {

        // Menu 
        window.Menu = function() {
            var showMenuIcon = function () {
                Cookies.set('menu-animation-shown', true);
                TweenLite.set(menuIcon, { opacity: .5, ease: Quart.easeInOut });

                $(document).on("mouseover", function (e) {
                    TweenMax.to(menuIcon, 1, { opacity: 1 });
                });
                $(document).on("mouseout", function (e) {
                    TweenMax.to(menuIcon, 1, { opacity: .5 });
                });
            };


            var menuIcon = $('.menu-icon');
            if (!Cookies.get('menu-animation-shown')) {
                TweenMax.to(menuIcon, 1, { opacity: .65, repeat: 5, onComplete: showMenuIcon, ease: Quart.easeInOut });
            } else {
                showMenuIcon();
            }



            $(menuIcon).on("click", function () {
                openMenu();
                return false;
            });

            var openMenu = function () {

                if ($('.menu')) {
                    $('.menu').remove();
                }
                $('.container').append("<div class='menu'>" +
                  "<ul>" +
                    "<li role=\"presentation\"><a href=\"" + window.rootPath + "#/hello\">Home</a></li>" +
                    "<li role=\"presentation\"><a href=\"" + window.rootPath + "#/about\">About</a></li>" +
                    "<li role=\"presentation\"><a href=\"" + window.rootPath + "#/work\">Work</a></li>" +
                    "<li role=\"presentation\"><a href=\"http://blog.vintagepixelfoundry.com\" target=\"_blank\">Blog</a></li>" +
                    "<li role=\"presentation\"><a href=\"https://vintagepixelfoundry.typeform.com/to/RXUYMO\" target=\"_blank\">Contact</a></li>" +
                    "</ul>" +
                    //"<img class='comingSoon' src='images/comingsoon.svg'/>" +
                    "<span class='close-icon'><img src=\"images/close-icon.png\"</span>" +
                    "</div>");
                var $menu = $('.menu');
                var $landing = $('.landing');
                //var $comingSoon = $('.comingSoon');

                $menu.height("100%");
                //TweenLite.set($comingSoon, { perspective: -200, scale: 0, maxWidth: "50%", opacity: 0, rotationX: -180 });
                //TweenLite.to($comingSoon, .6, { perspective: 0, scale: 1.5, opacity: 1, rotationX: 0, delay: 1 });
                TweenMax.to($menu, .5, { opacity: 1 });
                TweenMax.from($menu, .5, { scaleX: 1.15, scaleY: 1.15, force3D: true, ease: Quart.easeInOut });
                TweenMax.to($landing, .4, { scaleX: 0.85, scaleY: 0.85, force3D: true, ease: Quart.easeInOut });
                initClose();
            };


            var initClose = function () {
                $('.close-icon').on("click", function (e) {
                    closeMenu();
                });
                var closeMenu = function () {
                    var $menu = $('.menu');
                    var $landing = $('.landing');
                    //TweenLite.set('.comingSoon', { opacity: 0 });
                    TweenLite.set('#close-icon', { opacity: 0 });
                    TweenMax.from($menu, .5, { scaleX: 1, scaleY: 1, force3D: true, ease: Quart.easeInOut });
                    TweenMax.to($landing, .5, { scaleX: 1, scaleY: 1, force3D: true, ease: Quart.easeInOut });
                    TweenMax.to($menu, .3, {
                        opacity: 0,
                        onComplete: function () {
                            $menu.remove();
                        }
                    });
                };

                $('.menu > ul >  li > a').on('click', function() {
                    //TweenMax.killAll();
                    closeMenu();
                });
            };

            // end window.Menu
        };

        // Runs on the hello page
        window.Hello = function() {

            function loadComplete() {
                    
                    $(landing).append("<img src=\"images/cloud.png\" id=\"cloud1\" />");
                    $(landing).append("<img src=\"images/cloud.png\" id=\"cloud2\" />");
                    $(landing).append("<img src=\"images/cloud.png\" id=\"cloud3\" />");

                    $("#cloud1").css({
                        position: "absolute",
                        width: "27%",
                        left: 0,
                        top: "23.25%",
                        opacity: 0,
                        overflow: "hidden",
                        zIndex: 1
                    });
                    $("#cloud2").css({
                        position: "absolute",
                        width: "42%",
                        top: "52%",
                        opacity: 0,
                        transform: "rotate(180deg)",
                        overflow: "hidden",
                        zIndex: 1
                    });
                    $("#cloud3").css({
                        position: "absolute",
                        left: "-15%",
                        width: "62%",
                        top: "73%",
                        opacity: 1,
                        overflow: "hidden",
                        zIndex: 1
                    });
                    var cloud1 = document.getElementById("cloud1");
                    var cloud2 = document.getElementById("cloud2");
                    var cloud3 = document.getElementById("cloud3");
                    var landingWidth = $(".landing").width();


                    TweenMax.to(landing, 1, { opacity: 1 });
                    TweenMax.to(cloud1, 4, { opacity: .44, delay: 2 });
                    TweenMax.to(cloud2, 5, { opacity: .78, delay: 1 });
                    TweenMax.to(cloud3, 3, { opacity: .44, delay: .75 });
                    TweenMax.to(cloud1, 500, { x: landingWidth - cloud2.width / 2 });
                    TweenMax.from(cloud2, 550, { x: landingWidth / 2 });
                    TweenMax.to(cloud3, 450, { x: landingWidth });
                    TweenMax.fromTo(logo, 3, { opacity: 0 }, { opacity: 1, delay: 1.25, ease: Quint.easeInOut });

                    var addRightCloud = function () {
                        $(landing).append("<img src=\"images/cloud.png\" id=\"cloud2\" />");

                        $("#cloud2").css({
                            position: "absolute",
                            width: "38%",
                            right: 0,
                            top: 498,
                            opacity: .2,
                            transform: "rotate(180deg)",
                            zIndex: 1
                        });
                    };

                    var resizeTimer;

                    $(window).on('resize', function (e) {
                        var cloud2 = document.getElementById("cloud2");
                        $(cloud2).fadeOut();
                        $(cloud2).remove();

                        clearTimeout(resizeTimer);
                        resizeTimer = setTimeout(function () {
                            var landingWidth = $('.landing').width();
                            addRightCloud();
                            var cloudwidth = $('#cloud2').width();
                            var cloud = $('#cloud2');
                            TweenMax.to(cloud, 10, { opacity: .85 });
                            TweenMax.fromTo(cloud, 600, { x: landingWidth / 3 - cloudwidth }, { x: -landingWidth });
                        }, 250);

                    });
                // end loadComplete
            };

            $(document).ready(function() {
                setTimeout(function() {
                    loadComplete();
                }, 1250);
            });

        };


        window.About = function() {

            setTimeout(function() {
                var newText = "Vintage Pixel Foundry is a digital creative firm in Boise, Idaho.";
                var msg1 = document.getElementById("msg1");
                var msg2 = document.getElementById("msg2");

                TweenLite.set(msg1, { opacity: 0 });
                TweenLite.set(msg2, { opacity: 0 });
                //TweenLite.to(msg1, 1, { scrambleText: "THIS IS NEW TEXT" });
                //TweenLite.to(msg1, 2, { scrambleText: { text: newText }, chars:"}{", ease: Linear.easeNone }).reversed(true);
                //or customize things:
                TweenLite.to(msg1, 2, { opacity: 1, scrambleText: { text: newText, chars: "010101", revealDelay: 0.5, speed: 0.2 } });
                TweenLite.to(msg2, 2, { opacity: 1, delay: 3});
            
            }, 200);
        };


        window.Work = function () {
            var workMsg = document.getElementById("workMsg");
            var msg = "We\'re currently currating our best work to present here. Please check back later."
            TweenLite.set(workMsg, { opacity: 0 });
            TweenLite.to(workMsg, 2, { opacity: 1, scrambleText: { text: msg, chars: "010101", revealDelay: 0.5, speed: 0.2 } });
        };

       // OTHER GSAP SCRIPTS HERE...

        // END WINDOW LOAD
    });





}());
