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

        /*--- initialisation des tailles de viewport ---*/
        currentWidth = wWidth = viewport().width;
        currentHeight = wHeight = viewport().height;

        wScroll = $(window).scrollTop();

        /*================== INITIALISATIONS ==========================*/

        $('body').keypress(function() {
          if ( event.which == 119 ) {
             event.preventDefault();
             $('body').toggleClass('dev');
          }
        });

        /*--- scroll tableaux qui debordent - 1/2 ---*/
        scrollTable('.editor-wysiwyg');

        /*================== ACTIONS AU RESIZE ET SCROLL ==========================*/

        /*--- fonctions dependant de resolution d'ecran (si reconnait media queries) ---*/
        if (Modernizr.mq('only all')) {


            $(window).on('resize', function() {
                wWidth = viewport().width;
                wHeight = viewport().height;
                if (currentHeight != wHeight || currentWidth != wWidth) {
                    currentHeight = wHeight;
                    currentWidth = wWidth;
                    /*--- timer pour le redimensionnement d'ecran ---*/
                    clearTimeout(timerResponsive);
                    timerResponsive = setTimeout(makeResponsive, 300);
                }

            });
        }
		makeResponsive();

        /*--- fonctions au scroll ---*/
        $(window).on('scroll', function() {
            wScroll = $(window).scrollTop();
        });

        /*================== ACTIONS SPECIFIQUES OLD IE ==========================*/

    });


    document.onreadystatechange = function() {
        if (document.readyState == "complete") {
            makeResponsive();
        }
    }

    function makeResponsive() {
        /*--- garde proportions iframe 1/2 ---*/
        /*--- mettre styles iframe width:100% ---*/
        resizeIframe('.editor-wysiwyg');
    }

	/*================== FONCTIONS GENERALES ==========================*/

    function viewport() {
        var e = window, a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return {
            width: e[ a + 'Width' ],
            height: e[ a + 'Height' ]
        };
    }

    function resizeIframe(className) {
        $(className + ' iframe').each(function() {
            var ratio = $(this).attr('width') / $(this).attr('height');
            var newH = $(this).width() / ratio;
            $(this).css('height', newH + 'px');
        });
    }

    /*--- scroll tableaux qui debordent - 2/2 ---*/
    function scrollTable(className) {
        $(className + ' table').each(function() {
            var table = $(this);
            var container = $('<div class="table-scroll"></div>')
            $(table).before(container);
            $(container).append(table);
        });
    }

	/*================== FONCTIONS SPECIFIQUES AU PROJET ==========================*/

    /*================== FONCTIONS GLOBALES PROJET (POUR UTILISATION DEV) ==========================*/

})(jQuery);
