/**
*
* Slider
* Generic class for slider
*
* @author vincegobelins
*/

class Slider {

  /**
  *
  * Constructor
  *
  * @param wrapper jQuery Object Slider wrapper
  * @param speed jQuery Object Slider slides
  * @param speed Number Object Slider speed
  */

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

  /**
  *
  * Init Slider
  *
  */

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

  /**
  *
  * Slide before callback
  *
  * @param current Object current slide
  */

  onSlideBefore(current) {
    TweenMax.staggerTo(".current-slide .tween-side", 1, {x: "20%", opacity: 0, ease: Power2.easeInOut}, 0.2);
    $(".pager-slider").addClass("active");
  }

  /**
  *
  * Slide after callback
  *
  * @param current Object current slide
  * @param oldIndex Int slide old index
  * @param newIndex Int slide new index
  */

  onSlideAfter(current, oldIndex, newIndex) {
    this.sendEvent(newIndex);
    this.updatePager(oldIndex, newIndex);

    $(".item-detail").removeClass("current-slide");
    current.addClass("current-slide");
    TweenMax.set(".current-slide .tween-side", {clearProps:"transform"});
    TweenMax.staggerTo(".current-slide .tween-side", 1.5, {x: "0%", opacity: 1, delay: 0.5, ease: Power2.easeInOut}, 0.2);
    setTimeout(function(){ $(".pager-slider").removeClass("active");; }, 4000);

  }

  /**
  *
  * Fully load slider callback
  *
  */

  onSliderLoad() {
    TweenMax.set(".current-slide .tween-side", {clearProps:"transform"});
    TweenMax.staggerTo(".current-slide .tween-side", 1.5, {x: "0%", opacity: 1, delay: 0.5, ease: Power2.easeInOut}, 0.2);
  }

  /**
  *
  * Go to specific slide
  *
  * @param pointer Int slide number
  */

  goTo(pointer) {
    this.slider.goToSlide(pointer);
  }

  /**
  *
  * Go to previous slide
  *
  * @param e Object event
  */

  prev(e) {
    e.preventDefault();
    this.slider.goToPrevSlide();
    this.slider.stopAuto();
  }

  /**
  *
  * Go to next slide
  *
  * @param e Object event
  */

  next(e) {
    e.preventDefault();
    this.slider.goToNextSlide();
    this.slider.stopAuto();
  }

  /**
  *
  * Update pager
  *
  * @param oldSlide int previous slide number
  * @param newSlide int next slide number
  */

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

  /**
  *
  * Send a custom event when a new slide is displayed
  *
  * @param pointer Int Slide number
  */

  sendEvent(pointer) {
    /*
    let myEvent = new CustomEvent("nextSlide", {
      detail: {
    		pointer: pointer
    	},
      bubbles: true,
    	cancelable: false
    });

    document.dispatchEvent(myEvent);
    */

    $( "#body").trigger( "nextSlide", pointer );
  }

  /**
  *
  * Bind UI Actions
  *
  */

  bindUIActions() {
    let prev = document.getElementById("prev");
    let next = document.getElementById("next");

    prev.addEventListener('click', this.prev.bind(this), false);
    next.addEventListener('click', this.next.bind(this), false);
  }
}
