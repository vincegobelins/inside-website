//@prepros-prepend class/*

/**
*
* App
* Main Controller
*
* @author vincegobelins
*/

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
    if(sliderWrapper.length > 0) {
      let slider = new Slider(sliderWrapper, sliderItems, 0, true, "fade");
    }

    // init screen slider
    let screenSliderWrapper = $("#slider-2");
    let screenSliderItems = $(".item-screen");
    if(sliderWrapper.length > 0) {
      store.screenSlider = new ScreenSlider(screenSliderWrapper, screenSliderItems, 1000, false, "fade");
    }

    // video player
    let video = document.getElementById("video-player");
    if(video) {
      let player = new Player(video);
    }

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

      // TODO : Don't call parallax on scroll but with requestAnimationFrame
      if (!/Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)) {
        store.parallax.update();
      }

      store.inView.update();
    }
  }
}

app.init();
