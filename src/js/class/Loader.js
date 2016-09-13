/**
*
* Loader JS
* Display loader while the page is loading
*
* @author vincegobelins
*/

class Loader {

  /**
  *
  * Constructor
  *
  */

  constructor() {
    this.position = 80;
    this.time = 10;
    this.animateLoader();
    this.bindUIActions();
  }

  /**
  *
  * Fake animation loading
  *
  */

  animateLoader() {
    TweenMax.to(".progress-loading", this.time, {width: this.position +"%", ease:Power2.easeInOut});
  }

  /**
  *
  * End fake animation
  *
  */

  end() {
    TweenMax.to(".progress-loading", 1, {width: 100 +"%", ease:Power2.easeInOut, onComplete:this.hide});
  }

  /**
  *
  * Hide loader
  *
  */

  hide() {
    $(".loading").addClass("leave");

    $( "#body").trigger( "loaded" );
  }

  /**
  *
  * Bind UI Actions
  *
  */

  bindUIActions() {
    let self = this;

    $(window).bind("load", function() {
       self.end();
    });
  }


}
