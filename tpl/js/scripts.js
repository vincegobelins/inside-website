(function($) {
    // Theme path
    var urlTpl = 'tpl/';

    // Variables
    var wWidth;
    var wHeight;
    var currentWidth;
    var currentHeight;
    var timerResponsive;
    var wScroll;

    $(function() {
        /*================== GENERAL ==========================*/

        /*--- javascript strict mode ---*/
        "use strict";

        /*================== INITIALISATIONS ==========================*/

        $('body').keypress(function() {
          if ( event.which == 119 ) {
             event.preventDefault();
             $('body').toggleClass('dev');
          }
        });

        /*================== PARALLAX ==========================*/

        /*
        var controller = new ScrollMagic.Controller();

        // build tween
        var tweenIntro = new TimelineMax ()
          .add([
            TweenMax.fromTo(".bloc-subtitle-intro", 1, {top: 50}, {top: 300, ease: Power4.easeOut}),
            TweenMax.fromTo(".bloc-shape-video-intro", 1, {top: "40%"}, {top: "90%", ease: Power4.easeOut})
          ]);

          var tweenFlaps = new TimelineMax ()
            .add([
              //TweenMax.fromTo(".bloc-subtitle-intro", 1, {top: 100}, {top: 200, ease: Linear.easeNone}),
              //TweenMax.fromTo(".bloc-shape-video-intro", 1, {top: "40%"}, {top: "90%", ease: Linear.easeNone})
              TweenMax.from("#bloc-img-item-flap-1", 0.5, {top: -200, ease: Power4.easeOut}),
              TweenMax.from("#bloc-img-item-flap-2", 0.5, {top: -200, ease: Power4.easeOut}),
              TweenMax.from("#bloc-img-item-flap-3", 0.5, {top: -200, ease: Power4.easeOut})
            ]);

        // build scene
        var sceneIntro = new ScrollMagic.Scene({triggerElement: ".intro", duration: $(window).width()})
                .setTween(tweenIntro)
                .addIndicators() // add indicators (requires plugin)
                .addTo(controller);

                var sceneFlaps = new ScrollMagic.Scene({triggerElement: ".flaps", duration: $(window).height()})
                        .setTween(tweenFlaps)
                        .addIndicators() // add indicators (requires plugin)
                        .addTo(controller);
*/
    });

})(jQuery);
