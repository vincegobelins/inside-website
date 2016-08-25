/** ###############
* In View *
* ############## */

class InView {

  constructor(itemsHTML, isMobile) {
    this.items = [];
    this.isMobile = isMobile;
    this.activeItems = [];
    this.scrollPos = 0;
    this.windowHeight = window.innerHeight;

    for (let i = 0; i < itemsHTML.length; i++) {
      for (let j = 0; j < itemsHTML[i].length; j++) {
        let item = {
          id : j,
          obj: itemsHTML[i][j]
        }

        this.items.push(item);
      }
    }

    if(this.isMobile) {
      this.doMobile();
    }
  }

  /**
  * Add / Remove items displayed on screen
  */

  update() {

    if(!this.isMobile) {
      for (let i = 0; i < this.items.length; i++) {

        let offScreen = -500;

        let offsetTop = this.items[i].obj.getBoundingClientRect().top;
        let offsetBottom = this.items[i].obj.getBoundingClientRect().bottom;

        if(offsetTop - offScreen < this.windowHeight && offsetBottom > -offScreen) {
          this.activate($(this.items[i].obj));
        }
      }
    }

  }

  activate(el){
    el.addClass("active");
  }

  doMobile() {
    for (let i = 0; i < this.items.length; i++) {
      this.activate($(this.items[i].obj));
    }
  }
}

/** ###############
* Parallax *
* ############## */

class Parallax {

  constructor(itemsHTML) {
    this.items = [];
    this.activeItems = [];
    this.scrollPos = 0;
    this.windowHeight = window.innerHeight;

    for (let i = 0; i < itemsHTML.length; i++) {
      let item = {
        id : i,
        obj: itemsHTML[i],
        speed: itemsHTML[i].dataset.speed,
        translateX: itemsHTML[i].dataset.x,
        step: 0
      }

      this.items.push(item);
    }

    this.update();
    this.render();
  }

  /**
  * Add / Remove items displayed on screen
  */

  update() {

    for (let i = 0; i < this.items.length; i++) {

      let offScreen = 500;

      let offsetTop = this.items[i].obj.getBoundingClientRect().top;
      let offsetBottom = this.items[i].obj.getBoundingClientRect().bottom;

      if(offsetTop - offScreen < this.windowHeight && offsetBottom > -offScreen) {
        this.activeItems[this.items[i].id] = this.items[i];
      }
      else if(this.activeItems[this.items[i].id]) {
        this.activeItems.splice(this.items[i].id);
      }
    }

  }

  /**
  * Render parallax
  */

  render() {
    self = this;
    Array.prototype.forEach.call(this.activeItems, function(item) {
      //check if x transform exist
      let translateX = 0;
      if(item.translateX) {
        translateX = item.translateX;
      }

      let position = item.obj.getBoundingClientRect().height/2 - item.obj.getBoundingClientRect().top;
      let offset = ( position * 100 / self.windowHeight) * item.speed;
      let transform = 'translate3d(' + 0 + ','+ offset.toFixed(2) + 'px,' + 0 + ')';
      item.obj.style["transform"] = transform;
      item.obj.style["webkitTransform"] = transform
      item.obj.style["mozTransform"] = transform;
      item.obj.style["msTransform"] = transform;
    });

    requestAnimationFrame(this.render.bind(this));
  }
}

/** ###############
* Slider *
* ############## */

class Slider {

  constructor(wrapper, slides, speed, auto, mode) {
    this.wrapper = wrapper;
    this.slides = slides;
    this.speed = speed;
    this.auto = auto;
    this.mode = mode;
    this.slider = null;

    this.initSlider();
    this.bindUIActions();
  }

  initSlider() {

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

      onSlideBefore: ($slideElement) => { this.onSlideBefore($slideElement); },
      onSlideAfter: ($slideElement, oldIndex, newIndex) => { this.onSlideAfter($slideElement, oldIndex, newIndex); },
      onSliderLoad: () => { this.onSliderLoad(); }
    });
  }

  onSlideBefore(current) {
    TweenMax.staggerTo(".current-slide .tween-side", 1, {x: "20%", opacity: 0, ease: Power2.easeInOut}, 0.2);
    $(".pager-slider").addClass("active");
  }

  onSlideAfter(current, oldIndex, newIndex) {
    this.sendEvent(newIndex);
    this.updatePager(oldIndex, newIndex);

    $(".item-detail").removeClass("current-slide");
    current.addClass("current-slide");
    TweenMax.set(".current-slide .tween-side", {clearProps:"transform"});
    TweenMax.staggerTo(".current-slide .tween-side", 1.5, {x: "0%", opacity: 1, delay: 0.5, ease: Power2.easeInOut}, 0.2);
    setTimeout(function(){ $(".pager-slider").removeClass("active");; }, 4000);

  }

  onSliderLoad() {
    TweenMax.set(".current-slide .tween-side", {clearProps:"transform"});
    TweenMax.staggerTo(".current-slide .tween-side", 1.5, {x: "0%", opacity: 1, delay: 0.5, ease: Power2.easeInOut}, 0.2);
  }

  goTo(pointer) {
    this.slider.goToSlide(pointer);
  }

  prev(e) {
    e.preventDefault();
    this.slider.goToPrevSlide();
    this.slider.stopAuto();
  }

  next(e) {
    e.preventDefault();
    this.slider.goToNextSlide();
    this.slider.stopAuto();
  }

  updatePager(oldSlide, newSlide) {
    let oldIndex = parseInt(oldSlide + 1);
    let newIndex = parseInt(newSlide + 2);

    if(newIndex > this.slider.getSlideCount()) {
      newIndex = 1;
    }

    let prev = document.getElementById("prev");
    let next = document.getElementById("next");

    prev.innerHTML = "0"+ parseInt(oldIndex);
    next.innerHTML = "0"+ parseInt(newIndex);
  }

  sendEvent(pointer) {

    let myEvent = new CustomEvent("nextSlide", {
      detail: {
    		pointer: pointer
    	},
      bubbles: true,
    	cancelable: false
    });

    document.dispatchEvent(myEvent);
  }

  bindUIActions() {
    let prev = document.getElementById("prev");
    let next = document.getElementById("next");

    prev.addEventListener('click', this.prev.bind(this), false);
    next.addEventListener('click', this.next.bind(this), false);
  }
}

/** ###############
* Player *
* ############## */

class Player {

  constructor(video) {
    this.video = video;
    this.timeline = null;
    this.bindUIActions();
  }

  /**
  * Open Player on page
  */

  openPlayer(link) {

    // set poster
    this.setPoster(link.dataset.poster);

    // set video time
    this.video.currentTime = link.dataset.time;

    // set animation
    this.timeline = new TimelineMax({onReverseComplete:this.pause.bind(this), onComplete:this.play.bind(this)});

    this.timeline.set(".wrap-cta-close-player", {opacity:0});
    this.timeline.set(".video-player", {x:"-100%"});
    this.timeline.set(".player", {visibility:"visible"});
    this.timeline.to(".overlay-player-1", 2.5, {x:"200%", ease:Power2.easeInOut});
    this.timeline.set(".player", {background:"rgb(6, 0, 130)"}, 1.25);
    this.timeline.set(".video-player", {x:"0%"}, 1.25);
    this.timeline.to(".overlay-player-2", 4, {x:"190%", ease:Power2.easeInOut}, -0.2);
    this.timeline.to(".wrap-cta-close-player", 0.25, {opacity:1, ease:Power2.easeInOut});
  }

  close() {
    this.timeline.reverse();
    TweenMax.to(this.video, 1, {volume: 0, delay: 2, ease:Power2.easeInOut});
  }

  setPoster(poster) {
    this.video.setAttribute('poster', poster);
  }

  play() {
    this.video.volume = 0;
    this.video.play();
    TweenMax.to(this.video, 1, {volume: 1, ease:Power2.easeInOut});
  }

  pause() {
    this.video.pause();
  }

  toggle() {
    if(this.video.paused) {
      this.play();
    }
    else {
      this.pause();
    }
  }

  bindUIActions() {
    let self = this;
    $( ".link-item-flap" ).on( "click", function(e) {
      e.preventDefault();
      self.openPlayer(this);
    });

    this.video.addEventListener("click", this.toggle.bind(this));

    let closeBtn = document.getElementById("cta-close-player");
    closeBtn.addEventListener("click", this.close.bind(this));
  }


}

/** ###############
* Screen Slider *
* ############## */

class ScreenSlider extends Slider {
  onSlideBefore(current) {
    //todo
  }

  onSlideAfter(current) {
    //todo
  }

  onSliderLoad() {
    //todo
  }
}

/**
*
* Map
* Build GMaps on #gmap div
*
* @author Vincent Aguettaz
*/

class Map {

  /**
  *
  * Constructor
  *
  * @param data JSON Object with markers data
  */

  constructor(data) {

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
      content: "coucou info view",
      shadowStyle: 0,
      padding: 0,
      backgroundColor: "",
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
    for (let i=0; i<data.length; i++) {
      this.addMarker(data[i]);
    }

    // center map
    this.center();

    this.bindUIActions();
  }

  /**
  *
  * Zoom in the map while maxZoom limit is not riched
  *
  * @param event Click or touch event
  * @return void
  */
  zoomIn(event) {
    event.preventDefault();

    if(this.zoom < this.maxZoom) {
      this.zoom = this.zoom + 1;
      this.map.setZoom(this.zoom);
    }
  }

  /**
  *
  * Zoom out the map while minZoom limit is not riched
  *
  * @param event Click or touch event
  * @return void
  */
  zoomOut(event) {
    event.preventDefault();

    if(this.zoom > this.minZoom) {
      this.zoom = this.zoom - 1;
      this.map.setZoom(this.zoom);
    }
  }

  /**
  *
  * Create a marker on the map
  *
  * @param data Object with data for one marker (latLng, state, time, title, location)
  * @return void
  */
  addMarker(data) {
    self = this;

    let marker = new google.maps.Marker({
      position: data.latLng,
      map: self.map,
      icon: this.getIcon(data.state),
      size: new google.maps.Size(50, 50),
      anchor: new google.maps.Point(0, 0),
      origin: new google.maps.Point(25, 25),
      data: {title: data.title, time: data.time, place: data.location},
      optimized:false
    });

    marker.addListener('click', function(e) {
      this.showInfo(marker);
      this.map.panTo(marker.position);
    }.bind(this), false);

    this.markers.push(marker);
  }

  /**
  *
  * Get Icon with the appropriate picture
  *
  * @param state String wich give the current status of the event
  * @return icon Object wich define a Google Maps icon
  */
  getIcon(state) {
    let img = "";

    if(state == "live") {
      img = 'tpl/img/marker-1.svg';
    }
    if(state == "old") {
      img = 'tpl/img/marker-2.svg';
    }
    if(state == "new") {
      img = 'tpl/img/marker-3.svg';
    }

    let icon = {
      url: img,
      size: new google.maps.Size(50, 50),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(25, 25)
    };

    return icon;
  }

  /**
  *
  * Set content and show infobulle
  *
  * @param marker Google Map Marker Object
  * @return void
  */
  showInfo(marker) {
    this.infowindow.setContent('<div class="infobubble-bg"></div><div class="content-infobubble"><h4 class="title-infobubble">' + marker.data.title + '</h4>'
+'<p class="time-infobubble">' + marker.data.time + '</p>'
    + '<p class="location-infobubble">' + marker.data.place + '</p>'
    + '<a href="#" class="link-infobubble">Voir le concert</a></div>');

    let closeInfo = document.getElementById('close-infobubble');
    //closeInfo.addEventListener('click', this.closeInfo.bind(this), false);

    this.infowindow.open(self.map, marker);
  }

  /**
  *
  * Close Infobulle
  *
  * @return void
  */
  closeInfo() {
    alert('yepa !');
    this.infowindow.close(self.map, marker);
  }

  /**
  *
  * Fit bounds the map
  *
  * @return void
  */
  center() {
    var bounds = new google.maps.LatLngBounds ();
    console.log(this.markers);
    for (var i = 0; i < this.markers.length; i++) {
      bounds.extend (this.markers[i].position);
    }
    this.map.setCenter(bounds.getCenter());
    this.map.fitBounds(bounds);
  }

  /**
  *
  * Get the style of the map
  *
  * @return Array wich define styles
  */
  getStyle() {
    return [
      {
          "featureType": "administrative",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#0200fd"
              },
              {
                  "visibility": "on"
              },
              {
                  "weight": "1"
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#0200fd"
              },
              {
                  "weight": "1.30"
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#000181"
              },
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": 45
              },
              {
                  "color": "#0c005f"
              },
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#0200ff"
              },
              {
                  "visibility": "on"
              }
          ]
      }
  ]
  }

  /**
  *
  * Bind UI Action for Zoom
  *
  * @return void
  */
  bindUIActions() {
    let zoomIn = document.getElementById("zoom-in");
    let zoomOut = document.getElementById("zoom-out");

    zoomIn.addEventListener('click', this.zoomIn.bind(this), false);
    zoomOut.addEventListener('click', this.zoomOut.bind(this), false);
  }
}

/** ###############
* Loader *
* ############## */

class Loader {

  constructor() {
    this.position = 80;
    this.time = 10;
    this.animateLoader();
    this.bindUIActions();
  }

  animateLoader() {
    TweenMax.to(".progress-loading", this.time, {width: this.position +"%", ease:Power2.easeInOut});
  }

  end() {
    TweenMax.to(".progress-loading", 1, {width: 100 +"%", ease:Power2.easeInOut, onComplete:this.hide});
  }

  hide() {
    $(".loading").addClass("leave");

    let myEvent = new CustomEvent("loaded", {
      bubbles: true,
    	cancelable: false
    });

    document.dispatchEvent(myEvent);
  }

  bindUIActions() {
    let self = this;

    $(window).bind("load", function() {
       self.end();
    });
  }


}

/**
*
* ViewportHeight
* Allow elements to take the viewport height size
*
* @author Vincent Aguettaz
*/

class ViewportHeight {

  /**
  *
  * Constructor
  *
  * @param className the class of element
  * @param widthMin Unset height under this width value
  * @param widthMax Unset height over this width value
  */

  constructor(className, widthMin, widthMax) {
    this.className = className;
    this.widthMin = widthMin;
    this.widthMax = widthMax;

    this.setViewportHeight();
    this.bindUIActions();
  }

  /**
  *
  * Set viewport height to element
  *
  * @return void
  */

  setViewportHeight() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    if( width < this.widthMax && width > this.widthMin) {
      $(this.className).height(height);
    }
    else {
      $(this.className).height('auto');
    }
  }

  /**
  *
  * If the viewport is resized
  *
  * @return void
  */

  bindUIActions() {
    let self = this;

    $( window ).resize(function() {
      self.setViewportHeight();
    });
  }


}


/** ###############
* App *
* ############## */


var store, app = {

  store: {
    screenSlider : "",
    inView : null,
    parallax: null
  },

  init: function() {
    store = this.store;
    let loader = new Loader();
    this.bindUI();

    // make sur the video is played on mobile device
    let bgVideo = document.getElementById("video-intro");
    $( ".wrap-intro" ).on( "click", function() {
      alert("clicked !");
      bgVideo.play();
    });

    // init slider
    let sliderWrapper = $("#slider-1");
    let sliderItems = $(".item-detail");
    let slider = new Slider(sliderWrapper, sliderItems, 0, true, "fade");

    // init screen slider
    let screenSliderWrapper = $("#slider-2");
    let screenSliderItems = $(".item-screen");
    store.screenSlider = new ScreenSlider(screenSliderWrapper, screenSliderItems, 1000, false, "fade");

    // video player
    let video = document.getElementById("video-player");
    let player = new Player(video);

    // set viewport height to element
    let intro = new ViewportHeight('.wrap-video-intro', 0, 1030);

    // add class active when is displayed
    let sections = document.getElementsByTagName("section");
    let header = document.getElementsByTagName("header");
    let footer = document.getElementsByTagName("footer");
    store.inView = new InView([sections, header, footer]);

    // check mobile device
    if (/Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)) {
      $('.wrap-video-intro').addClass('disabled');

      store.inView = new InView([sections, header, footer], true);
    }
    else {
      // get parallax items and init parallax
      let parallaxItems = document.getElementsByClassName("parallax");
      store.parallax = new Parallax(parallaxItems);

      store.inView = new InView([sections, header, footer], false);
    }

    document.addEventListener('nextSlide', this.updateSliders, false);
    document.addEventListener('loaded', this.onLoad, false);

  },

  onLoad : function() {
    window.setTimeout(function() {store.inView.update();}, 1000);
    $(".header").addClass("active");
  },

  initMap : function() {

    let markers = [
      {
        id: 0,
        title: "L.E.J.",
        state: "old",
        time: "12/07/2015",
        location: "Le Brise Glace",
        latLng : {
          lat: 45.900,
          lng: 6.124
        }
      },
      {
        id: 1,
        title: "Eva Peillex",
        state: "live",
        time: "15/06/2016",
        location: "CCI Formation",
        latLng : {
          lat: 45.896,
          lng: 6.128
        }
      },
      {
        id: 2,
        title: "Louise Roam",
        state: "live",
        time: "28/05/2016",
        location: "Le Brise Glace",
        latLng : {
          lat: 45.893514,
          lng: 6.135523
        }
      },
      {
        id: 3,
        title: "L.E.J.",
        state: "new",
        time: "12/07/2015",
        location: "Le Brise Glace",
        latLng : {
          lat: 45.893114,
          lng: 6.120
        }
      }
    ];

    let map = new Map(markers);
  },


  updateSliders: function(e){
    let pointer = e.detail.pointer;
    store.screenSlider.goTo(pointer);
  },

  bindUI: function(){
    $('body').keypress(function() {
      if ( event.which == 119 ) {
         event.preventDefault();
         $('body').toggleClass('dev');
      }
    });

    window.onscroll = function (e) {
      let scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

      if (!/Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)) {
        store.parallax.update();
      }

      store.inView.update();
    }
  }
}

app.init();
