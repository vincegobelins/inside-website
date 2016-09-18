/**
*
* Parallax
* Parallax effect
*
* @author vincegobelins
*/

class Parallax {

  /**
  *
  * Constructor
  *
  * @param itemsHTML Array HTML Elements to parallax
  */

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
        height: itemsHTML[i].offsetHeight,
        step: 0
      }

      this.items.push(item);
    }

    this.update();
    this.render();
  }

  /**
  *
  * Manage the array with active element
  *
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
  *
  * Render the parallax
  *
  */

  render() {
    let self = this;
    Array.prototype.forEach.call(this.activeItems, function(item) {
      let scrollPosition = $(window).scrollTop();
      let elPosition = $(item.obj).offset().top ;
      let position = (elPosition - scrollPosition - 400) * item.speed/10;
      let transform = 'translate3d(' + 0 + ','+ position.toFixed(2) + 'px,' + 0 + ')';
      item.obj.style["transform"] = transform;
      item.obj.style["webkitTransform"] = transform
      item.obj.style["mozTransform"] = transform;
      item.obj.style["msTransform"] = transform;
    });

  }
}
