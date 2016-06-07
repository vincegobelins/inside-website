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
        step: 0
      }

      this.items.push(item);
    }

    this.bindUIActions();
    this.render();
  }

  /**
  * Add / Remove items displayed on screen
  */

  update() {

    for (let i = 0; i < this.items.length; i++) {

      let offsetTop = this.items[i].obj.getBoundingClientRect().top;
      let offsetBottom = this.items[i].obj.getBoundingClientRect().bottom;

      if(offsetTop < this.windowHeight && offsetBottom > 0) {
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
      let position = item.obj.getBoundingClientRect().height/2 - item.obj.getBoundingClientRect().top;
      let offset = ( position * 100 / self.windowHeight) * item.speed;
      let transform = 'translateY(' + offset.toFixed(2) + 'px)';
      item.obj.style["transform"] = transform;
      item.obj.style["webkitTransform"] = transform
      item.obj.style["mozTransform"] = transform;
      item.obj.style["msTransform"] = transform;
    });

    requestAnimationFrame(this.render.bind(this));
  }

  /**
  * Update on scroll
  */

  bindUIActions() {
    let self = this;

    window.onscroll = function (e) {
      self.scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
      self.update();
    }
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
      adaptiveHeight: true,
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

  updatePager(oldIndex, newIndex) {
    let prev = document.getElementById("prev");
    let next = document.getElementById("next");
    oldIndex = parseInt(oldIndex);
    newIndex = parseInt(newIndex);

    prev.innerHTML = "0"+ oldIndex;
    next.innerHTML = "0"+ newIndex;
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

/** ###############
* Map *
* ############## */

class Map {
  constructor(markers) {

    self = this;

    this.zoom = 15;
    this.latLng = {lat: 45.896, lng: 6.128};
    this.map = new google.maps.Map(document.getElementById('gmap'), {
      center: self.latLng,
      scrollwheel: false,
      zoom: parseInt(self.zoom),
      styles: self.getStyle(),
      disableDefaultUI: true
    });

    for (let i=0; i<markers.length; i++) {
      this.addMarker(markers[i]);
    }

    this.bindUIActions();
  }

  zoomIn(e) {
    e.preventDefault();
    this.zoom = this.zoom + 1;
    this.map.setZoom(this.zoom);
  }

  zoomOut(e) {
    e.preventDefault();
    this.zoom = this.zoom - 1;
    this.map.setZoom(this.zoom);
  }

  addMarker(marker) {
    let circle1 = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 20,
      strokeColor: '#fff',
      strokeWeight: 2
    };

    let circle2 = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 10,
      strokeColor: '#fff',
      strokeWeight: 2
    };

    let line = new google.maps.Polyline({
      path: [{lat: 22.291, lng: 153.027}, {lat: 18.291, lng: 153.027}],
      icons: [
        {
          icon: circle1
        }, {
          icon: circle2
        }
      ]
    });

    self = this;
    new google.maps.Marker({
      position: marker.latLng,
      map: self.map,
      icon: new google.maps.Polyline({
        path: [{lat: 22.291, lng: 153.027}, {lat: 18.291, lng: 153.027}],
        icons: [
          {
            icon: circle1
          }, {
            icon: circle2
          }
        ]
      })
    });
  }

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

  bindUIActions() {
    let zoomIn = document.getElementById("zoom-in");
    let zoomOut = document.getElementById("zoom-out");

    zoomIn.addEventListener('click', this.zoomIn.bind(this), false);
    zoomOut.addEventListener('click', this.zoomOut.bind(this), false);
  }
}

/** ###############
* App *
* ############## */


var store, app = {

  store: {
    screenSlider : ""
  },

  init: function() {
    store = this.store;
    this.bindUI();

    // get parallax items and init parallax
    let parallaxItems = document.getElementsByClassName("parallax");
    let parallax = new Parallax(parallaxItems);

    // init slider
    let sliderWrapper = $("#slider-1");
    let sliderItems = $(".item-detail");
    let slider = new Slider(sliderWrapper, sliderItems, 0, true, "fade");

    // init screen slider
    let screenSliderWrapper = $("#slider-2");
    let screenSliderItems = $(".item-screen");
    store.screenSlider = new ScreenSlider(screenSliderWrapper, screenSliderItems, 1000, false, "fade");

    document.addEventListener('nextSlide', this.updateSliders, false);

  },

  initMap : function() {

    let markers = [
      {
        id: 0,
        latLng : {
          lat: 45.896,
          lng: 6.128
        }
      },
      {
        id: 1,
        latLng : {
          lat: 45.893514,
          lng: 6.135523
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
  }
}

app.init();
