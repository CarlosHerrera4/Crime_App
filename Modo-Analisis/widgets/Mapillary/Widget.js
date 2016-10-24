/* globals define, esri */
define([
  './widgets/Mapillary/mapillary-js.min.js',

  'dojo/dom',
  'dojo/on',
  'dojo/_base/declare',

  'esri/Color',
  'esri/geometry/Point',
  'esri/geometry/webMercatorUtils',
  'esri/graphic',
  'esri/InfoTemplate',
  'esri/layers/VectorTileLayer',
  'esri/SpatialReference',
  'esri/symbols/SimpleLineSymbol',
  'esri/symbols/SimpleMarkerSymbol',

  'jimu/BaseWidget'
],
function (
  Mapillary,

  dom,
  on,
  declare,

  Color,
  Point,
  webMercatorUtils,
  Graphic,
  InfoTemplate,
  VectorTileLayer,
  SpatialReference,
  SimpleLineSymbol,
  SimpleMarkerSymbol,

  BaseWidget
) {
  // To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {

    // Custom widget code goes here

    baseClass: 'mapillary',
    // this property is set by the framework when widget is loaded.
    // name: 'Mapillary',
    // add additional properties here

    // methods to communication with app container:
    postCreate: function () {
      this.inherited(arguments)
      console.log('Mapillary::postCreate')
    },

    startup: function () {
      this.inherited(arguments)
      console.log('Mapillary::startup')

      this.mapillary = new Mapillary.Viewer(
        'mly',
        this.config.clientId,
        null,
        {
          cover: false,
          detection: true
        }
      )

      // Hide Mappilary viewer
      this.parentEl = this.mapillary._container.element.parentElement
      this.toggleViewerVisibility(false)

      var layers = new VectorTileLayer('widgets/Mapillary/mapillary-style.json')

      this.map.addLayer(layers)

      var that = this

      // TODO: if default...
      console.log('defaultCoverage = ', this.config.defaultCoverage)

      dom.byId('mapillarysequences').checked = this.config.defaultCoverage
      layers.setVisibility(this.config.defaultCoverage)

      // Bind event to map click
      this.map.on('click', function (event) {
        var mp = webMercatorUtils.webMercatorToGeographic(event.mapPoint)

        closeToPromise = that.mapillary.moveCloseTo(mp.y, mp.x)
        closeToPromise.catch(function (err) {
          alert('We couldn\'t load the data from the map, zoom in to the area that interests you an try clicking again');
        })
      })

      this.mapillary.on('nodechanged', this.onNodeChanged.bind(this))

      on(dom.byId('mapillarysequences'), 'change', function () {
        var mapillarysequences = dom.byId('mapillarysequences')
        layers.setVisibility(mapillarysequences.checked)
      })
    },

    // onOpen: function(){
    //   console.log('Mapillary::onOpen');
    // },

    // onClose: function(){
    //   console.log('Mapillary::onClose');
    // },

    // onMinimize: function(){
    //   console.log('Mapillary::onMinimize');
    // },

    // onMaximize: function(){
    //   console.log('Mapillary::onMaximize');
    // },

    // onSignIn: function(credential){
    //   console.log('Mapillary::onSignIn', credential);
    // },

    // onSignOut: function(){
    //   console.log('Mapillary::onSignOut');
    // }

    // onPositionChange: function(){
    //   console.log('Mapillary::onPositionChange');
    // },

    resize: function(){
      console.log('Mapillary::resize');
      this.mapillary.resize()
    },

    // methods to communication between widgets:
    toggleViewerVisibility: function (val) {
      var klaz = 'hide-viewer-content'

      if (val) {
        this.parentEl.classList.remove(klaz)
      } else {
        this.parentEl.classList.add(klaz)
      }
    },

    onNodeChanged: function (node) {
      var lon = node.latLon.lon
      var lat = node.latLon.lat

      this.map.graphics.clear()
      this.toggleViewerVisibility(true)
      this.mapillary.resize()

      var pt = new Point(lon, lat, new SpatialReference({ 'wkid': 4326 }))

      var marker = new esri.symbol.SimpleMarkerSymbol(
        esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE,
        20,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                             new Color([255, 255, 255]),
                             3),
        new Color([255, 134, 27]))

      this.map.graphics.add(new Graphic(
        webMercatorUtils.geographicToWebMercator(pt),
        marker,
        { 'title': lon + ' ' + lat, 'content': 'A Mapillary Node' },
        new InfoTemplate('${title}', '${content}')
      ))
    }

  })
})
