/**
*
* Player
* Full screen HTML5 Video
*
* @author vincegobelins
*/

class Player {

  /**
  *
  * Constructor
  *
  * @param video Object HTML video
  */

  constructor(video) {
    this.video = video;
    this.timeline = null;
    this.bindUIActions();
  }

  /**
  *
  * Open player
  *
  * @param link Object button object used to get meta data
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

  /**
  *
  * Close video
  *
  */

  close() {
    this.timeline.reverse();
    TweenMax.to(this.video, 1, {volume: 0, delay: 2, ease:Power2.easeInOut});
  }

  /**
  *
  * Set thumbnail video
  *
  */

  setPoster(poster) {
    this.video.setAttribute('poster', poster);
  }

  /**
  *
  * Play video
  *
  */

  play() {
    this.video.volume = 0;
    this.video.play();
    TweenMax.to(this.video, 1, {volume: 1, ease:Power2.easeInOut});
  }

  /**
  *
  * Pause video
  *
  */

  pause() {
    this.video.pause();
  }

  /**
  *
  * Toggle video
  *
  */

  toggle() {
    if(this.video.paused) {
      this.play();
    }
    else {
      this.pause();
    }
  }

  /**
  *
  * Bind UI Actions
  *
  */

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
