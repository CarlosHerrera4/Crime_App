define(['dojo/_base/declare', 'jimu/BaseWidget', 'esri/layers/FeatureLayer', 'esri/symbols/SimpleFillSymbol', 'esri/symbols/SimpleLineSymbol', 'esri/renderers/SimpleRenderer', 'esri/graphic', 'esri/lang', 'esri/Color', 'dojo/number', 'dojo/dom-style',
'dijit/TooltipDialog', 'dijit/popup', 'dojo/domReady!'],
  function(declare, BaseWidget, FeatureLayer,
        SimpleFillSymbol, SimpleLineSymbol,
        SimpleRenderer, Graphic, esriLang,
        Color, number, domStyle,
        TooltipDialog, dijitPopup) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {
      // Custom widget code goes here

      baseClass: 'jimu-widget-customwidget',

      //this property is set by the framework when widget is loaded.
      //name: 'CustomWidget',


      //methods to communication with app container:

       postCreate: function() {
         this.inherited(arguments);
         console.log('postCreate');
       },

       startup: function() {
        this.inherited(arguments);
        //this.mapIdNode.innerHTML = 'map id:' + this.map.id;
        console.log('startup');
       },

       onOpen: function(){
         console.log('onOpen');
           
           // Aquí metemos la capa de Barrios de Madrid y los campos
           // var southCarolinaCounties = new FeatureLayer("http://localhost:6080/arcgis/rest/services/PFM/DivisionesAdministrativas/MapServer/2", {
         southCarolinaCounties = new FeatureLayer("http://services6.arcgis.com/ISJgswKTd7DKhcLN/ArcGIS/rest/services/DivisionesAdministrativasMadrid/FeatureServer/1", {
          mode: FeatureLayer.MODE_SNAPSHOT,
          outFields: ["*"]
        });
        //southCarolinaCounties.setDefinitionExpression("STATE_NAME = 'South Carolina'");

        var symbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID,
          new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID,
            new Color([255,255,255,0.35]),
            4
          ),
          new Color([125,125,125,0.35])
        );
        southCarolinaCounties.setRenderer(new SimpleRenderer(symbol));
        this.map.addLayer(southCarolinaCounties);

        this.map.infoWindow.resize(245,125);

        dialog = new TooltipDialog({
          id: "tooltipDialog",
          style: "position: absolute; width: 250px; font: normal normal normal 10pt Helvetica;z-index:100"
        });
        dialog.startup();

        var highlightSymbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID,
          new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID,
            new Color([255,0,0]), 3
          ),
          new Color([125,125,125,0.35])
        );

        //close the dialog when the mouse leaves the highlight graphic
        
          this.map.graphics.enableMouseEvents();
          this.map.graphics.on("mouse-out", closeDialog);

        

        //listen for when the onMouseOver event fires on the countiesGraphicsLayer
        //when fired, create a new graphic with the geometry from the event.graphic and add it to the maps graphics layer
           
           // Aquí cambiamos lo que queremos que aparezca en el popup
        southCarolinaCounties.on("mouse-over", function(evt){
          var t = "<b>Distrito: ${NOMDIS}</b><hr><b>Nombre del barrio: </b>${NOMBRE}<br>"
            + "<b>Población (hab) : </b>${TOTPOP_CY:NumberFormat}<br>"
            + "<b>Hombres: </b>${MALES_CY:NumberFormat}<br>"
            + "<b>Mujeres: </b>${FEMALES_CY:NumberFormat}<br>"
            + "<b>Renta per cápita (€): </b>${PPPC_CY:NumberFormat}<br>"
            + "<b>Mujeres edad 0-14 años: </b>${FAGE01_CY:NumberFormat}<br>"
            + "<b>Mujeres edad 15-29 años: </b>${FAGE02_CY:NumberFormat}<br>"
            + "<b>Mujeres edad 30-44 años: </b>${FAGE03_CY:NumberFormat}<br>"
            + "<b>Mujeres edad 45-59 años: </b>${FAGE04_CY:NumberFormat}<br>"
            + "<b>Mujeres edad 60 o más años: </b>${FAGE05_CY:NumberFormat}<br>"
            + "<b>Hombres edad 0-14 años: </b>${MAGE01_CY:NumberFormat}<br>"
            + "<b>Hombres edad 15-29 años: </b>${MAGE02_CY:NumberFormat}<br>"
            + "<b>Hombres edad 30-44 años: </b>${MAGE03_CY:NumberFormat}<br>"
            + "<b>Hombres edad 45-59 años: </b>${MAGE04_CY:NumberFormat}<br>"
            + "<b>Hombres edad 60 o más años: </b>${MAGE05_CY:NumberFormat}<br>";

          var content = esriLang.substitute(evt.graphic.attributes,t);
          var highlightGraphic = new Graphic(evt.graphic.geometry,highlightSymbol);
          //this.graphics.add(highlightGraphic);
            highlightGraphic.draw();
          dialog.setContent(content);

          domStyle.set(dialog.domNode, "opacity", 0.85);
          dijitPopup.open({
            popup: dialog,
            x: evt.pageX,
            y: evt.pageY
          });
            
          var queryTask = new QueryTask("http://services6.arcgis.com/ISJgswKTd7DKhcLN/ArcGIS/rest/services/DivisionesAdministrativasMadrid/FeatureServer/1");
          var query = new Query();
          query.returnGeometry = false;
          query.outFields = ["*"];
          
          
            
            
        });
        

        function closeDialog() {
          map.graphics.clear();
          dijitPopup.close(dialog);
        }
           
           
           
       },

      onClose: function(){
        console.log('onClose');
        this.map.removeLayer(southCarolinaCounties);
        dijitPopup.close(dialog);
      },

      // onMinimize: function(){
      //   console.log('onMinimize');
      // },

      // onMaximize: function(){
      //   console.log('onMaximize');
      // },

      // onSignIn: function(credential){
      //   /* jshint unused:false*/
      //   console.log('onSignIn');
      // },

      // onSignOut: function(){
      //   console.log('onSignOut');
      // }

      // onPositionChange: function(){
      //   console.log('onPositionChange');
      // },

      // resize: function(){
      //   console.log('resize');
      // }

      //methods to communication between widgets:

    });
  });