/**
*
* In view
* Do some stuff when is on screen
*
* @author vincegobelins
*/

class InView {

  /**
  *
  * Constructor
  *
  * @param itemsHTML Array HTML Elements to check
  * @param isMobile Boolean define if is mobile
  */

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
  *
  * Manage items array
  *
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

  /**
  *
  * Method fired when element is on screen
  *
  * @param el Object HTML Element
  */

  activate(el){
    el.addClass("active");
  }

  /**
  *
  * Mobile exception (activate all elements)
  *
  */

  doMobile() {
    for (let i = 0; i < this.items.length; i++) {
      this.activate($(this.items[i].obj));
    }
  }
}
