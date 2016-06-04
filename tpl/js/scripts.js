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

  constructor(wrapper, slides, speed) {
    this.wrapper = wrapper;
    this.slides = slides;
    this.speed = speed;

    this.initSlider();
  }

  initSlider() {
    let self = this;

    let slider = this.wrapper.bxSlider({
      mode: "fade",
      speed: 0,
      pause: 5000,
      controls: false,
      auto: true,
      autoControls: false,
      autoControlsCombine: false,
      pager: false,
      touchEnabled: true,
      adaptiveHeight: true,
      responsive: true,

      onSlideBefore: ($slideElement) => { this.onSlideBefore($slideElement); },
      onSlideAfter: ($slideElement) => { this.onSlideAfter($slideElement); },
      onSliderLoad => { this.onSliderLoad(); },
    });
  }

  onSlideBefore(current) {
    TweenMax.staggerTo(".current-slide .tween-side", 1, {x: "-100%", ease: Power2.easeInOut}, 0.25);
    $(".pager-slider").addClass("active");
  }

  onSlideAfter(current) {
    $(".item-detail").removeClass("current-slide");
    current.addClass("current-slide");
    TweenMax.staggerTo(".current-slide .tween-side", 1, {x: "0%", delay: 0.5, ease: Power2.easeInOut}, 0.25);
    setTimeout(function(){ $(".pager-slider").removeClass("active");; }, 4000);
  }

  onSliderLoad() {
    TweenMax.staggerTo(".current-slide .tween-side", 1, {x: "0%", delay: 0.5, ease: Power2.easeInOut}, 0.25);
  }
}

/** ###############
* App *
* ############## */


var app = {

  init: function() {
    this.bindUI();

    // get parallax items and init parallax
    let parallaxItems = document.getElementsByClassName("parallax");
    let parallax = new Parallax(parallaxItems);

    // init slider
    let sliderWrapper = $("#slider-1");
    let sliderItems = $(".item-detail");
    let slider = new Slider(sliderWrapper, sliderItems, 0);
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
