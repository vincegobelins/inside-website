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
//this.activeItems[1].obj.getBoundingClientRect().height/2 - this.activeItems[1].obj.getBoundingClientRect().top) * 100 / this.windowHeight

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
      let transform = 'translateY(' + offset + 'px)';
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


var app = {

  init: function() {
    this.bindUI();

    // get parallax items and init parallax
    let parallaxItems = document.getElementsByClassName("parallax");
    let parallax = new Parallax(parallaxItems);
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
