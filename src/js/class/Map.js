/**
*
* Map
* Build GMaps on #gmap div
*
* @author vincegobelins
*/

class Map {

  /**
  *
  * Constructor
  *
  * @param data JSON Object with markers data
  */

  constructor(data) {

    let self = this;

    // init map
    this.zoom = 15;
    this.minZoom = 5;
    this.maxZoom = 15;
    this.markers = [];
    this.map = new google.maps.Map(document.getElementById('gmap'), {
      scrollwheel: false,
      //zoom: parseInt(self.zoom),
      styles: self.getStyle(),
      disableDefaultUI: true,
      maxZoom: this.maxZoom,
      minZoom: this.minZoom
    });

    // init InfoWindow
    this.infowindow = new InfoBubble({
      map: this.map,
      content: "coucou info view",
      shadowStyle: 0,
      padding: 0,
      backgroundColor: "",
      borderRadius: 0,
      arrowSize: -25,
      arrowPosition: 0,
      borderWidth: 0,
      disableAutoPan: true,
      hideCloseButton: false,
      backgroundClassName: 'infobubble',
      arrowStyle: 0,
      minWidth: 230,
      maxWidth: 230,
      minHeight: 190,
      closeSrc: 'src/img/close.png'
    });

    // init markers
    for (let i=0; i<data.length; i++) {
      this.addMarker(data[i]);
    }

    // center map
    this.center();

    this.bindUIActions();
  }

  /**
  *
  * Zoom in the map while maxZoom limit is not riched
  *
  * @param event Click or touch event
  * @return void
  */
  zoomIn(event) {
    event.preventDefault();

    if(this.zoom < this.maxZoom) {
      this.zoom = this.zoom + 1;
      this.map.setZoom(this.zoom);
    }
  }

  /**
  *
  * Zoom out the map while minZoom limit is not riched
  *
  * @param event Click or touch event
  * @return void
  */
  zoomOut(event) {
    event.preventDefault();

    if(this.zoom > this.minZoom) {
      this.zoom = this.zoom - 1;
      this.map.setZoom(this.zoom);
    }
  }

  /**
  *
  * Create a marker on the map
  *
  * @param data Object with data for one marker (latLng, state, time, title, location)
  * @return void
  */
  addMarker(data) {
    self = this;

    let marker = new google.maps.Marker({
      position: data.latLng,
      map: self.map,
      icon: this.getIcon(data.state),
      size: new google.maps.Size(50, 50),
      anchor: new google.maps.Point(0, 0),
      origin: new google.maps.Point(25, 25),
      data: {title: data.title, time: data.time, place: data.location},
      optimized:false
    });

    marker.addListener('click', function(e) {
      this.showInfo(marker);
      this.map.panTo(marker.position);
    }.bind(this), false);

    this.markers.push(marker);
  }

  /**
  *
  * Get Icon with the appropriate picture
  *
  * @param state String wich give the current status of the event
  * @return icon Object wich define a Google Maps icon
  */
  getIcon(state) {
    let img = "";

    if(state == "live") {
      img = 'src/img/marker-1.svg';
    }
    if(state == "old") {
      img = 'src/img/marker-2.svg';
    }
    if(state == "new") {
      img = 'src/img/marker-3.svg';
    }

    let icon = {
      url: img,
      size: new google.maps.Size(50, 50),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(25, 25)
    };

    return icon;
  }

  /**
  *
  * Set content and show infobulle
  *
  * @param marker Google Map Marker Object
  * @return void
  */
  showInfo(marker) {
    this.infowindow.setContent('<div class="infobubble-bg"></div><div class="content-infobubble"><h4 class="title-infobubble">' + marker.data.title + '</h4>'
+'<p class="time-infobubble">' + marker.data.time + '</p>'
    + '<p class="location-infobubble">' + marker.data.place + '</p>'
    + '<a href="#" class="link-infobubble">Voir le concert</a></div>');

    let closeInfo = document.getElementById('close-infobubble');
    //closeInfo.addEventListener('click', this.closeInfo.bind(this), false);

    this.infowindow.open(self.map, marker);
  }

  /**
  *
  * Close Infobulle
  *
  * @return void
  */
  closeInfo() {
    alert('yepa !');
    this.infowindow.close(self.map, marker);
  }

  /**
  *
  * Fit bounds the map
  *
  * @return void
  */
  center() {
    var bounds = new google.maps.LatLngBounds ();
    console.log(this.markers);
    for (var i = 0; i < this.markers.length; i++) {
      bounds.extend (this.markers[i].position);
    }
    this.map.setCenter(bounds.getCenter());
    this.map.fitBounds(bounds);
  }

  /**
  *
  * Get the style of the map
  *
  * @return Array wich define styles
  */
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

  /**
  *
  * Bind UI Action for Zoom
  *
  * @return void
  */
  bindUIActions() {
    let zoomIn = document.getElementById("zoom-in");
    let zoomOut = document.getElementById("zoom-out");

    zoomIn.addEventListener('click', this.zoomIn.bind(this), false);
    zoomOut.addEventListener('click', this.zoomOut.bind(this), false);
  }
}
