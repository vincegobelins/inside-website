/**
*
* ViewportHeight
* Allow elements to take the viewport height size
*
* @author vincegobelins
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
