/** ###############
* In View *
* ############## */

'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var InView = (function () {
  function InView(itemsHTML, isMobile) {
    _classCallCheck(this, InView);

    this.items = [];
    this.isMobile = isMobile;
    this.activeItems = [];
    this.scrollPos = 0;
    this.windowHeight = window.innerHeight;

    for (var i = 0; i < itemsHTML.length; i++) {
      for (var j = 0; j < itemsHTML[i].length; j++) {
        var item = {
          id: j,
          obj: itemsHTML[i][j]
        };

        this.items.push(item);
      }
    }

    if (this.isMobile) {
      this.doMobile();
    }
  }

  _createClass(InView, [{
    key: 'update',

    /**
    * Add / Remove items displayed on screen
    */

    value: function update() {

      if (!this.isMobile) {
        for (var i = 0; i < this.items.length; i++) {

          var offScreen = -500;

          var offsetTop = this.items[i].obj.getBoundingClientRect().top;
          var offsetBottom = this.items[i].obj.getBoundingClientRect().bottom;

          if (offsetTop - offScreen < this.windowHeight && offsetBottom > -offScreen) {
            this.activate($(this.items[i].obj));
          }
        }
      }
    }
  }, {
    key: 'activate',
    value: function activate(el) {
      el.addClass('active');
    }
  }, {
    key: 'doMobile',
    value: function doMobile() {
      for (var i = 0; i < this.items.length; i++) {
        this.activate($(this.items[i].obj));
      }
    }
  }]);

  return InView;
})();

/** ###############
* Parallax *
* ############## */

var Parallax = (function () {
  function Parallax(itemsHTML) {
    _classCallCheck(this, Parallax);

    this.items = [];
    this.activeItems = [];
    this.scrollPos = 0;
    this.windowHeight = window.innerHeight;

    for (var i = 0; i < itemsHTML.length; i++) {
      var item = {
        id: i,
        obj: itemsHTML[i],
        speed: itemsHTML[i].dataset.speed,
        translateX: itemsHTML[i].dataset.x,
        step: 0
      };

      this.items.push(item);
    }

    this.update();
    this.render();
  }

  _createClass(Parallax, [{
    key: 'update',

    /**
    * Add / Remove items displayed on screen
    */

    value: function update() {

      for (var i = 0; i < this.items.length; i++) {

        var offScreen = 500;

        var offsetTop = this.items[i].obj.getBoundingClientRect().top;
        var offsetBottom = this.items[i].obj.getBoundingClientRect().bottom;

        if (offsetTop - offScreen < this.windowHeight && offsetBottom > -offScreen) {
          this.activeItems[this.items[i].id] = this.items[i];
        } else if (this.activeItems[this.items[i].id]) {
          this.activeItems.splice(this.items[i].id);
        }
      }
    }
  }, {
    key: 'render',

    /**
    * Render parallax
    */

    value: function render() {
      self = this;
      Array.prototype.forEach.call(this.activeItems, function (item) {
        //check if x transform exist
        var translateX = 0;
        if (item.translateX) {
          translateX = item.translateX;
        }

        var position = item.obj.getBoundingClientRect().height / 2 - item.obj.getBoundingClientRect().top;
        var offset = position * 100 / self.windowHeight * item.speed;
        var transform = 'translate3d(' + 0 + ',' + offset.toFixed(2) + 'px,' + 0 + ')';
        item.obj.style['transform'] = transform;
        item.obj.style['webkitTransform'] = transform;
        item.obj.style['mozTransform'] = transform;
        item.obj.style['msTransform'] = transform;
      });

      requestAnimationFrame(this.render.bind(this));
    }
  }]);

  return Parallax;
})();

/** ###############
* Slider *
* ############## */

var Slider = (function () {
  function Slider(wrapper, slides, speed, auto, mode) {
    _classCallCheck(this, Slider);

    this.wrapper = wrapper;
    this.slides = slides;
    this.speed = speed;
    this.auto = auto;
    this.mode = mode;
    this.slider = null;

    this.initSlider();
    this.bindUIActions();
  }

  _createClass(Slider, [{
    key: 'initSlider',
    value: function initSlider() {
      var _this = this;

      this.slider = this.wrapper.bxSlider({
        mode: this.mode,
        speed: this.speed,
        pause: 7000,
        controls: false,
        auto: this.auto,
        autoControls: false,
        autoControlsCombine: false,
        pager: false,
        touchEnabled: true,
        adaptiveHeight: false,
        responsive: true,

        onSlideBefore: function onSlideBefore($slideElement) {
          _this.onSlideBefore($slideElement);
        },
        onSlideAfter: function onSlideAfter($slideElement, oldIndex, newIndex) {
          _this.onSlideAfter($slideElement, oldIndex, newIndex);
        },
        onSliderLoad: function onSliderLoad() {
          _this.onSliderLoad();
        }
      });
    }
  }, {
    key: 'onSlideBefore',
    value: function onSlideBefore(current) {
      TweenMax.staggerTo('.current-slide .tween-side', 1, { x: '20%', opacity: 0, ease: Power2.easeInOut }, 0.2);
      $('.pager-slider').addClass('active');
    }
  }, {
    key: 'onSlideAfter',
    value: function onSlideAfter(current, oldIndex, newIndex) {
      this.sendEvent(newIndex);
      this.updatePager(oldIndex, newIndex);

      $('.item-detail').removeClass('current-slide');
      current.addClass('current-slide');
      TweenMax.set('.current-slide .tween-side', { clearProps: 'transform' });
      TweenMax.staggerTo('.current-slide .tween-side', 1.5, { x: '0%', opacity: 1, delay: 0.5, ease: Power2.easeInOut }, 0.2);
      setTimeout(function () {
        $('.pager-slider').removeClass('active');;
      }, 4000);
    }
  }, {
    key: 'onSliderLoad',
    value: function onSliderLoad() {
      TweenMax.set('.current-slide .tween-side', { clearProps: 'transform' });
      TweenMax.staggerTo('.current-slide .tween-side', 1.5, { x: '0%', opacity: 1, delay: 0.5, ease: Power2.easeInOut }, 0.2);
    }
  }, {
    key: 'goTo',
    value: function goTo(pointer) {
      this.slider.goToSlide(pointer);
    }
  }, {
    key: 'prev',
    value: function prev(e) {
      e.preventDefault();
      this.slider.goToPrevSlide();
      this.slider.stopAuto();
    }
  }, {
    key: 'next',
    value: function next(e) {
      e.preventDefault();
      this.slider.goToNextSlide();
      this.slider.stopAuto();
    }
  }, {
    key: 'updatePager',
    value: function updatePager(oldSlide, newSlide) {
      var oldIndex = parseInt(oldSlide + 1);
      var newIndex = parseInt(newSlide + 2);

      if (newIndex > this.slider.getSlideCount()) {
        newIndex = 1;
      }

      var prev = document.getElementById('prev');
      var next = document.getElementById('next');

      prev.innerHTML = '0' + parseInt(oldIndex);
      next.innerHTML = '0' + parseInt(newIndex);
    }
  }, {
    key: 'sendEvent',
    value: function sendEvent(pointer) {

      var myEvent = new CustomEvent('nextSlide', {
        detail: {
          pointer: pointer
        },
        bubbles: true,
        cancelable: false
      });

      document.dispatchEvent(myEvent);
    }
  }, {
    key: 'bindUIActions',
    value: function bindUIActions() {
      var prev = document.getElementById('prev');
      var next = document.getElementById('next');

      prev.addEventListener('click', this.prev.bind(this), false);
      next.addEventListener('click', this.next.bind(this), false);
    }
  }]);

  return Slider;
})();

/** ###############
* Player *
* ############## */

var Player = (function () {
  function Player(video) {
    _classCallCheck(this, Player);

    this.video = video;
    this.timeline = null;
    this.bindUIActions();
  }

  _createClass(Player, [{
    key: 'openPlayer',

    /**
    * Open Player on page
    */

    value: function openPlayer(link) {

      // set poster
      this.setPoster(link.dataset.poster);

      // set video time
      this.video.currentTime = link.dataset.time;

      // set animation
      this.timeline = new TimelineMax({ onReverseComplete: this.pause.bind(this), onComplete: this.play.bind(this) });

      this.timeline.set('.wrap-cta-close-player', { opacity: 0 });
      this.timeline.set('.video-player', { x: '-100%' });
      this.timeline.set('.player', { visibility: 'visible' });
      this.timeline.to('.overlay-player-1', 2.5, { x: '200%', ease: Power2.easeInOut });
      this.timeline.set('.player', { background: 'rgb(6, 0, 130)' }, 1.25);
      this.timeline.set('.video-player', { x: '0%' }, 1.25);
      this.timeline.to('.overlay-player-2', 4, { x: '190%', ease: Power2.easeInOut }, -0.2);
      this.timeline.to('.wrap-cta-close-player', 0.25, { opacity: 1, ease: Power2.easeInOut });
    }
  }, {
    key: 'close',
    value: function close() {
      this.timeline.reverse();
      TweenMax.to(this.video, 1, { volume: 0, delay: 2, ease: Power2.easeInOut });
    }
  }, {
    key: 'setPoster',
    value: function setPoster(poster) {
      this.video.setAttribute('poster', poster);
    }
  }, {
    key: 'play',
    value: function play() {
      this.video.volume = 0;
      this.video.play();
      TweenMax.to(this.video, 1, { volume: 1, ease: Power2.easeInOut });
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.video.pause();
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      if (this.video.paused) {
        this.play();
      } else {
        this.pause();
      }
    }
  }, {
    key: 'bindUIActions',
    value: function bindUIActions() {
      var self = this;
      $('.link-item-flap').on('click', function (e) {
        e.preventDefault();
        self.openPlayer(this);
      });

      this.video.addEventListener('click', this.toggle.bind(this));

      var closeBtn = document.getElementById('cta-close-player');
      closeBtn.addEventListener('click', this.close.bind(this));
    }
  }]);

  return Player;
})();

/** ###############
* Screen Slider *
* ############## */

var ScreenSlider = (function (_Slider) {
  function ScreenSlider() {
    _classCallCheck(this, ScreenSlider);

    _get(Object.getPrototypeOf(ScreenSlider.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(ScreenSlider, _Slider);

  _createClass(ScreenSlider, [{
    key: 'onSlideBefore',
    value: function onSlideBefore(current) {}
  }, {
    key: 'onSlideAfter',
    value: function onSlideAfter(current) {}
  }, {
    key: 'onSliderLoad',
    value: function onSliderLoad() {}
  }]);

  return ScreenSlider;
})(Slider);

/**
*
* Map
* Build GMaps on #gmap div
*
* @author Vincent Aguettaz
*/

var Map = (function () {

  /**
  *
  * Constructor
  *
  * @param data JSON Object with markers data
  */

  function Map(data) {
    _classCallCheck(this, Map);

    self = this;

    // init map
    this.zoom = 15;
    this.minZoom = 5;
    this.maxZoom = 15;
    this.markers = [];
    this.map = new google.maps.Map(document.getElementById('gmap'), {
      scrollwheel: false,
      //zoom: parseInt(self.zoom),
      styles: self.getStyle(),
      disableDefaultUI: true,
      maxZoom: this.maxZoom,
      minZoom: this.minZoom
    });

    // init InfoWindow
    this.infowindow = new InfoBubble({
      map: this.map,
      content: 'coucou info view',
      shadowStyle: 0,
      padding: 0,
      backgroundColor: '',
      borderRadius: 0,
      arrowSize: -25,
      arrowPosition: 0,
      borderWidth: 0,
      disableAutoPan: true,
      hideCloseButton: false,
      backgroundClassName: 'infobubble',
      arrowStyle: 0,
      minWidth: 230,
      maxWidth: 230,
      minHeight: 190,
      closeSrc: 'tpl/img/close.png'
    });

    // init markers
    for (var i = 0; i < data.length; i++) {
      this.addMarker(data[i]);
    }

    // center map
    this.center();

    this.bindUIActions();
  }

  _createClass(Map, [{
    key: 'zoomIn',

    /**
    *
    * Zoom in the map while maxZoom limit is not riched
    *
    * @param event Click or touch event
    * @return void
    */
    value: function zoomIn(event) {
      event.preventDefault();

      if (this.zoom < this.maxZoom) {
        this.zoom = this.zoom + 1;
        this.map.setZoom(this.zoom);
      }
    }
  }, {
    key: 'zoomOut',

    /**
    *
    * Zoom out the map while minZoom limit is not riched
    *
    * @param event Click or touch event
    * @return void
    */
    value: function zoomOut(event) {
      event.preventDefault();

      if (this.zoom > this.minZoom) {
        this.zoom = this.zoom - 1;
        this.map.setZoom(this.zoom);
      }
    }
  }, {
    key: 'addMarker',

    /**
    *
    * Create a marker on the map
    *
    * @param data Object with data for one marker (latLng, state, time, title, location)
    * @return void
    */
    value: function addMarker(data) {
      self = this;

      var marker = new google.maps.Marker({
        position: data.latLng,
        map: self.map,
        icon: this.getIcon(data.state),
        size: new google.maps.Size(50, 50),
        anchor: new google.maps.Point(0, 0),
        origin: new google.maps.Point(25, 25),
        data: { title: data.title, time: data.time, place: data.location },
        optimized: false
      });

      marker.addListener('click', (function (e) {
        this.showInfo(marker);
        this.map.panTo(marker.position);
      }).bind(this), false);

      this.markers.push(marker);
    }
  }, {
    key: 'getIcon',

    /**
    *
    * Get Icon with the appropriate picture
    *
    * @param state String wich give the current status of the event
    * @return icon Object wich define a Google Maps icon
    */
    value: function getIcon(state) {
      var img = '';

      if (state == 'live') {
        img = 'tpl/img/marker-1.svg';
      }
      if (state == 'old') {
        img = 'tpl/img/marker-2.svg';
      }
      if (state == 'new') {
        img = 'tpl/img/marker-3.svg';
      }

      var icon = {
        url: img,
        size: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 25)
      };

      return icon;
    }
  }, {
    key: 'showInfo',

    /**
    *
    * Set content and show infobulle
    *
    * @param marker Google Map Marker Object
    * @return void
    */
    value: function showInfo(marker) {
      this.infowindow.setContent('<div class="infobubble-bg"></div><div class="content-infobubble"><h4 class="title-infobubble">' + marker.data.title + '</h4>' + '<p class="time-infobubble">' + marker.data.time + '</p>' + '<p class="location-infobubble">' + marker.data.place + '</p>' + '<a href="#" class="link-infobubble">Voir le concert</a></div>');

      var closeInfo = document.getElementById('close-infobubble');
      //closeInfo.addEventListener('click', this.closeInfo.bind(this), false);

      this.infowindow.open(self.map, marker);
    }
  }, {
    key: 'closeInfo',

    /**
    *
    * Close Infobulle
    *
    * @return void
    */
    value: function closeInfo() {
      alert('yepa !');
      this.infowindow.close(self.map, marker);
    }
  }, {
    key: 'center',

    /**
    *
    * Fit bounds the map
    *
    * @return void
    */
    value: function center() {
      var bounds = new google.maps.LatLngBounds();
      console.log(this.markers);
      for (var i = 0; i < this.markers.length; i++) {
        bounds.extend(this.markers[i].position);
      }
      this.map.setCenter(bounds.getCenter());
      this.map.fitBounds(bounds);
    }
  }, {
    key: 'getStyle',

    /**
    *
    * Get the style of the map
    *
    * @return Array wich define styles
    */
    value: function getStyle() {
      return [{
        'featureType': 'administrative',
        'elementType': 'all',
        'stylers': [{
          'color': '#0200fd'
        }, {
          'visibility': 'on'
        }, {
          'weight': '1'
        }]
      }, {
        'featureType': 'administrative',
        'elementType': 'labels.text.fill',
        'stylers': [{
          'color': '#0200fd'
        }, {
          'weight': '1.30'
        }, {
          'visibility': 'on'
        }]
      }, {
        'featureType': 'administrative',
        'elementType': 'labels.text.stroke',
        'stylers': [{
          'visibility': 'off'
        }]
      }, {
        'featureType': 'landscape',
        'elementType': 'all',
        'stylers': [{
          'color': '#000181'
        }, {
          'visibility': 'simplified'
        }]
      }, {
        'featureType': 'poi',
        'elementType': 'all',
        'stylers': [{
          'visibility': 'off'
        }]
      }, {
        'featureType': 'road',
        'elementType': 'all',
        'stylers': [{
          'saturation': -100
        }, {
          'lightness': 45
        }, {
          'color': '#0c005f'
        }, {
          'visibility': 'simplified'
        }]
      }, {
        'featureType': 'road.highway',
        'elementType': 'all',
        'stylers': [{
          'visibility': 'simplified'
        }]
      }, {
        'featureType': 'road.arterial',
        'elementType': 'labels.icon',
        'stylers': [{
          'visibility': 'off'
        }]
      }, {
        'featureType': 'transit',
        'elementType': 'all',
        'stylers': [{
          'visibility': 'off'
        }]
      }, {
        'featureType': 'water',
        'elementType': 'all',
        'stylers': [{
          'color': '#0200ff'
        }, {
          'visibility': 'on'
        }]
      }];
    }
  }, {
    key: 'bindUIActions',

    /**
    *
    * Bind UI Action for Zoom
    *
    * @return void
    */
    value: function bindUIActions() {
      var zoomIn = document.getElementById('zoom-in');
      var zoomOut = document.getElementById('zoom-out');

      zoomIn.addEventListener('click', this.zoomIn.bind(this), false);
      zoomOut.addEventListener('click', this.zoomOut.bind(this), false);
    }
  }]);

  return Map;
})();

/** ###############
* Loader *
* ############## */

var Loader = (function () {
  function Loader() {
    _classCallCheck(this, Loader);

    this.position = 80;
    this.time = 10;
    this.animateLoader();
    this.bindUIActions();
  }

  _createClass(Loader, [{
    key: 'animateLoader',
    value: function animateLoader() {
      TweenMax.to('.progress-loading', this.time, { width: this.position + '%', ease: Power2.easeInOut });
    }
  }, {
    key: 'end',
    value: function end() {
      TweenMax.to('.progress-loading', 1, { width: 100 + '%', ease: Power2.easeInOut, onComplete: this.hide });
    }
  }, {
    key: 'hide',
    value: function hide() {
      $('.loading').addClass('leave');

      var myEvent = new CustomEvent('loaded', {
        bubbles: true,
        cancelable: false
      });

      document.dispatchEvent(myEvent);
    }
  }, {
    key: 'bindUIActions',
    value: function bindUIActions() {
      var self = this;

      $(window).bind('load', function () {
        self.end();
      });
    }
  }]);

  return Loader;
})();

/**
*
* ViewportHeight
* Allow elements to take the viewport height size
*
* @author Vincent Aguettaz
*/

var ViewportHeight = (function () {

  /**
  *
  * Constructor
  *
  * @param className the class of element
  * @param widthMin Unset height under this width value
  * @param widthMax Unset height over this width value
  */

  function ViewportHeight(className, widthMin, widthMax) {
    _classCallCheck(this, ViewportHeight);

    this.className = className;
    this.widthMin = widthMin;
    this.widthMax = widthMax;

    this.setViewportHeight();
    this.bindUIActions();
  }

  _createClass(ViewportHeight, [{
    key: 'setViewportHeight',

    /**
    *
    * Set viewport height to element
    *
    * @return void
    */

    value: function setViewportHeight() {
      var width = window.innerWidth;
      var height = window.innerHeight;

      if (width < this.widthMax && width > this.widthMin) {
        $(this.className).height(height);
      } else {
        $(this.className).height('auto');
      }
    }
  }, {
    key: 'bindUIActions',

    /**
    *
    * If the viewport is resized
    *
    * @return void
    */

    value: function bindUIActions() {
      var self = this;

      $(window).resize(function () {
        self.setViewportHeight();
      });
    }
  }]);

  return ViewportHeight;
})();

/** ###############
* App *
* ############## */

var store,
    app = {

  store: {
    screenSlider: '',
    inView: null,
    parallax: null
  },

  init: function init() {
    store = this.store;
    var loader = new Loader();
    this.bindUI();

    // make sur the video is played on mobile device
    var bgVideo = document.getElementById('video-intro');
    $('.wrap-intro').on('click', function () {
      alert('clicked !');
      bgVideo.play();
    });

    // init slider
    var sliderWrapper = $('#slider-1');
    var sliderItems = $('.item-detail');
    if (sliderWrapper.length > 0) {
      var slider = new Slider(sliderWrapper, sliderItems, 0, true, 'fade');
    }

    // init screen slider
    var screenSliderWrapper = $('#slider-2');
    var screenSliderItems = $('.item-screen');
    if (sliderWrapper.length > 0) {
      store.screenSlider = new ScreenSlider(screenSliderWrapper, screenSliderItems, 1000, false, 'fade');
    }

    // video player
    var video = document.getElementById('video-player');
    if (video) {
      var player = new Player(video);
    }

    // set viewport height to element
    var intro = new ViewportHeight('.wrap-video-intro', 0, 1030);

    // add class active when is displayed
    var sections = document.getElementsByTagName('section');
    var header = document.getElementsByTagName('header');
    var footer = document.getElementsByTagName('footer');
    store.inView = new InView([sections, header, footer]);

    // check mobile device
    if (/Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)) {
      $('.wrap-video-intro').addClass('disabled');

      store.inView = new InView([sections, header, footer], true);
    } else {
      // get parallax items and init parallax
      var parallaxItems = document.getElementsByClassName('parallax');
      store.parallax = new Parallax(parallaxItems);

      store.inView = new InView([sections, header, footer], false);
    }

    document.addEventListener('nextSlide', this.updateSliders, false);
    document.addEventListener('loaded', this.onLoad, false);
  },

  onLoad: function onLoad() {
    window.setTimeout(function () {
      store.inView.update();
    }, 1000);
    $('.header').addClass('active');
  },

  initMap: function initMap() {

    var markers = [{
      id: 0,
      title: 'L.E.J.',
      state: 'old',
      time: '12/07/2015',
      location: 'Le Brise Glace',
      latLng: {
        lat: 45.900,
        lng: 6.124
      }
    }, {
      id: 1,
      title: 'Eva Peillex',
      state: 'live',
      time: '15/06/2016',
      location: 'CCI Formation',
      latLng: {
        lat: 45.896,
        lng: 6.128
      }
    }, {
      id: 2,
      title: 'Louise Roam',
      state: 'live',
      time: '28/05/2016',
      location: 'Le Brise Glace',
      latLng: {
        lat: 45.893514,
        lng: 6.135523
      }
    }, {
      id: 3,
      title: 'L.E.J.',
      state: 'new',
      time: '12/07/2015',
      location: 'Le Brise Glace',
      latLng: {
        lat: 45.893114,
        lng: 6.120
      }
    }];

    var map = new Map(markers);
  },

  updateSliders: function updateSliders(e) {
    var pointer = e.detail.pointer;
    store.screenSlider.goTo(pointer);
  },

  bindUI: function bindUI() {
    $('body').keypress(function () {
      if (event.which == 119) {
        event.preventDefault();
        $('body').toggleClass('dev');
      }
    });

    window.onscroll = function (e) {
      var scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

      if (!/Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)) {
        store.parallax.update();
      }

      store.inView.update();
    };
  }
};

app.init();

//todo

//todo

//todo
