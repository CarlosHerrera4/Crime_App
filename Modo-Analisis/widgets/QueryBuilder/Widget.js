define(['dojo/_base/declare', 
  'esri/layers/FeatureLayer',
  'esri/layers/GraphicsLayer',
  'esri/graphic',
  //'esri/PopupTemplate',
  'esri/dijit/PopupTemplate',
  'esri/InfoTemplate',
  'esri/geometry/Point',
  'esri/symbols/SimpleMarkerSymbol',
  'esri/symbols/SimpleFillSymbol', 
  'esri/symbols/PictureMarkerSymbol',
  'esri/Color',
  //'esri/widgets/Popup',
  'esri/dijit/Popup',
  'esri/request',
  'esri/tasks/GeometryService', 
  'esri/tasks/ProjectParameters',
  'esri/SpatialReference',
  'esri/geometry/webMercatorUtils',
  //'esri/tasks/support/Query',
  'esri/tasks/query',
  'esri/tasks/QueryTask',
  'jimu/BaseWidget',
  'bootstrap/Dropdown',
  'bootstrap/Tab',
  'bootstrap/Modal',
  'dojo/dom-class', 
  'dojo/dom-construct', 
  'dojo/on',
  'dojox/charting/Chart', 
  'dojox/charting/themes/Dollar',
  'dojo/domReady!'],
  function(declare, FeatureLayer, GraphicsLayer, Graphic, 
    PopupTemplate, InfoTemplate, Point, SimpleMarkerSymbol, SimpleFillSymbol, PictureMarkerSymbol, Color,
    Popup, esriRequest, GeometryService, ProjectParameters, SpatialReference, webMercatorUtils, Query, QueryTask, BaseWidget, domClass, domConstruct, 
    on, Chart, theme) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {
      // Custom widget code goes here

      baseClass: 'jimu-widget-customwidget',

      //this property is set by the framework when widget is loaded.
      name: 'CustomWidget',


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
      },

      muestraDistritos: function(event){
        // Comprobamos si ya se ha hecho una selección de distrito antes
        // Si la hay borramos la lista de barrios
        var num_options = document.getElementById("selectBarrios").options.length;
        var aea = document.getElementById("selectBarrios");
        if (num_options>1){
            for (var i=0; i <  num_options ; i++) {
                aea.removeChild(aea.childNodes[0]);
            }       
        }

        var target = event.target || event.srcElement;
        var distrito = document.getElementById("distrito").value;

        var layer_url = "http://services6.arcgis.com/ISJgswKTd7DKhcLN/ArcGIS/rest/services/DivisionesAdministrativas/FeatureServer/0/query?where=%22NOMDIS%22+%3D+%27" + distrito + "%27&outFields=*";
     
        var a = esriRequest({
          url: layer_url,
          content: { f: "json"},
          handleAs: "json",
          callbackParamName: "callback"
        });

        a.then(function(e) {
          debugger
          var g = e.features;
          var numbarrios = g.length;
          for (var count = 0; count <= numbarrios -1; count++){
            var new_barrio = document.createElement("option");
            new_barrio.value = g[count].attributes.NOMBRE;
            new_barrio.text = g[count].attributes.NOMBRE;
            document.getElementById("selectBarrios").add(new_barrio);       
          }
          document.getElementById("selectBarrios").style.display = "block";
          document.getElementById("p_Barrios").style.display = "block";
        })
      },

      muestraPuntos: function() {
        // These for loop  find the url to make the queries
        for (i=1 ; i<=9; i++) {
          if (document.getElementById(i).checked == true) {
            var delito = document.getElementById(i).value;
            var nombre_delito = document.getElementById(i).nextSibling.textContent;
          }
        }
        for (j=2013; j>=2008; j--) {
          if (document.getElementById(j).checked == true) {
            var anio = document.getElementById(j).value;
            var num_url = parseInt(delito) + parseInt(anio);
          }
        }

        var url = "http://services6.arcgis.com/ISJgswKTd7DKhcLN/ArcGIS/rest/services/Incidentes_Madrid/FeatureServer/" + num_url;
        
        var that = this;
        function whereQuery() {
          var aer = document.getElementById("distrito");
          var aer2 = document.getElementById("fecha_inicial");
          if (document.getElementById("fecha_inicial").valueAsDate == null || document.getElementById("fecha_final").valueAsDate == null) {
            var query_date = "";
            if (document.getElementById("distrito") == null) {
              var query_where = "1=1";
            } else {
              var query_distrito = "Distrito = '" + document.getElementById("distrito").value + "'";
              var query_barrio = "AND Barrio = '" + document.getElementById("selectBarrios").value + "'";
              var query_where = query_distrito + query_barrio;
            }
          } else {
            // We check if there are date range
            var f_inicial = document.getElementById("fecha_inicial").value +":00";
            var fecha_inicial = f_inicial.replace("T", " ");
            var f_final = document.getElementById("fecha_final").value +":00";
            var fecha_final = f_final.replace("T", " ");
            var query_date = "AND FECHA >= date'" + fecha_inicial + "' AND FECHA <= date'" + fecha_final + "'";
            if (document.getElementById("Distrito") == null) {
              var query_where = "FECHA >= date'" + fecha_inicial + "' AND FECHA <= date'" + fecha_final + "'";
            } else {
              var query_distrito = "Distrito = '" + document.getElementById("distrito").value + "'";
              var query_barrio = "AND Barrio = '" + document.getElementById("selectBarrios").value + "'";
              var query_where = query_distrito + query_barrio + query_date;
            }
          }
          return query_where;
        }

        
        var queryTask = new QueryTask(url);
        var query = new Query();
        query.where = whereQuery();
        query.outFields = ["*"];
        query.returnGeometry = true;
        queryTask.execute(query).then(function(result) {

          var num_points = result.features.length;
          graphic_layer = new GraphicsLayer();

          for (i=0; i < num_points; i++) {
            result2 = webMercatorUtils.xyToLngLat(result.features[i].geometry.x, result.features[i].geometry.y);
            var point_graphic =  new Point(result2);
            var markerSymbol = new SimpleMarkerSymbol({
              color: [226, 119, 40],
              outline: {
                color: [255, 255, 255],
                width: 2
              }
            });

            var b = esriRequest({
              url: url,
              content: { f: "json"},
              handleAs: "json",
              callbackParamName: "callback"
            });
            b.then(function(e) {
              pictureSymbol = new PictureMarkerSymbol(e.drawingInfo.renderer.symbol);
            });

            var d = new Date(result.features[i].attributes.FECHA);

            var template = new PopupTemplate();
            template.title = result.features[i].attributes.Barrio + " ("+ result.features[i].attributes.Distrito +")";
            template.content = "<p><b>Fecha: </b>" + d.toUTCString() + "</p><br><p><b>Delito: </b>" + nombre_delito + "</p><br><p><b>Calle: </b>" + result.features[i].attributes.CALLE + "</p>";

            var graphic = new Graphic();
            graphic.geometry = point_graphic;
            graphic.infoTemplate = template;
            graphic.symbol = pictureSymbol;
            that.map.graphics.add(graphic);

          }
          
        });
      },
        
      // onClose: function(){
      //   console.log('onClose');
      // },

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