define(['dojo/_base/declare', 
        'jimu/BaseWidget',
        'esri/layers/FeatureLayer',
        'esri/tasks/query',
        'esri/tasks/StatisticDefinition',
        'esri/geometry/geometryEngine',
        'esri/symbols/SimpleMarkerSymbol',
        'esri/symbols/SimpleLineSymbol',
        'esri/symbols/SimpleFillSymbol',
        'esri/graphic',
        'esri/Color',
        'dojo/dom',
        'dojo/domReady!'
       ],
  function(declare, BaseWidget, FeatureLayer, Query, StatisticDefinition, geometryEngine,
    SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Graphic, Color, dom) {
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
//        this.mapIdNode.innerHTML = 'map id:' + this.map.id;
        console.log('startup');
       },

       onOpen: function(){
         console.log('onOpen');
       },
        
       miFuncion: function(){
       
        // Url del servicio

       var url = "http://services6.arcgis.com/ISJgswKTd7DKhcLN/ArcGIS/rest/services/DivisionesAdministrativas/FeatureServer/0";
        // Campos de la capa

        var fields = [ "Robos_2013", "Robos_2012", "Robos_2011", "Robos_2010", "Robos_2009", "Robos_2008", "Robos_con_fuerza_en_las_cosas_2", "Robos_con_fuerza_en_las_cosas_3", "Robos_con_fuerza_en_las_cosas_4", "Robos_con_fuerza_en_las_cosas_5", "Robos_con_fuerza_en_las_cosas_6", "Robos_con_fuerza_en_las_cosas_7", "Robos_fuerza_en_las_cosas_vivie", "Robos_fuerza_en_las_cosas_viv_1", "Robos_fuerza_en_las_cosas_viv_2", "Robos_fuerza_en_las_cosas_viv_3", "Robos_fuerza_en_las_cosas_viv_4", "Robos_fuerza_en_las_cosas_viv_5", "Robos_con_violencia_2013", "Robos_con_violencia_2012", "Robos_con_violencia_2011", "Robos_con_violencia_2010", "Robos_con_violencia_2009", "Robos_con_violencia_2008", "Tirones_via_publica_2013", "Tirones_via_publica_2012", "Tirones_via_publica_2011", "Tirones_via_publica_2010", "Tirones_via_publica_2009", "Tirones_via_publica_2008", "Robos_en_establecimientos_2013", "Robos_en_establecimientos_2012", "Robos_en_establecimientos_2011", "Robos_en_establecimientos_2010", "Robos_en_establecimientos_2009", "Robos_en_establecimientos_2008", "Atracos_joyerias_2013", "Atracos_joyerias_2012", "Atracos_joyerias_2011", "Atracos_joyerias_2010", "Atracos_joyerias_2009", "Atracos_joyerias_2008", "Sustraccion_vehiculos_2013", "Sustraccion_vehiculos_2012", "Sustraccion_vehiculos_2011", "Sustraccion_vehiculos_2010", "Sustraccion_vehiculos_2009", "Sustraccion_vehiculos_2008", "Hurto_2013", "Hurto_2012", "Hurto_2011", "Hurto_2010", "Hurto_2009", "Hurto_2008", "Robos_con_violencia_en_vivienda", "Robos_con_violencia_en_vivien_1", "Robos_con_violencia_en_vivien_2", "Robos_con_violencia_en_vivien_3", "Robos_con_violencia_en_vivien_4", "Robos_con_violencia_en_vivien_5","TOTPOP_CY" ];
        
        // Creamos FeatureLayer con la Url y los campos
        var blockGroupsLyr = new FeatureLayer(url, {
          outFields: fields
        });

        // Symbol used to represent point clicked on map
        // Creamos símbolo (punto) para cuando hacemos click
        var pointSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0,255,0, 0.3]), 10), new Color([0,255,0,1]));

        // Symbol used to represent one-mile buffer around point
        // Creamos el símbolo del buffer. Pero no es un buffer
        var buffSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_LONGDASHDOT, new Color([255,128,0,1]), 3), new Color([255,128,0,0.15]));

        // When the map is clicked, get the point at the clicked location and execute getPoint()
        // Cuando hacemos click se ejecuta la función "getPoint"
        this.map.on("click", getPoint);

       
           
        // Expresión SQL para para mostrar los resultados
        // Coge los valores de delito y año que le estamos pasando y los junta en "cc"
        var aa = document.getElementById("delito");
        var bb = document.getElementById("anio");
        var cc = aa.value + "_" + bb.value
        
//        var sqlExpression = "Robos_2012";
        // Aquí establecemos el campo sobre el que haremos la consulta
        var sqlExpression = cc;

        // Object used to request the smallest population density from the 
        // block groups within one mile of the mouse click.
        var minStatDef = new StatisticDefinition();
        minStatDef.statisticType = "min";
        minStatDef.onStatisticField = sqlExpression;
        minStatDef.outStatisticFieldName = "minPopDensity";

        // Object used to request the largest population density from the 
        // block groups within one mile of the mouse click.
        var maxStatDef = new StatisticDefinition();
        maxStatDef.statisticType = "max";
        maxStatDef.onStatisticField = sqlExpression;
        maxStatDef.outStatisticFieldName = "maxPopDensity";



        // Object used to request the number of  
        // block groups within one mile of the mouse click.
        var countStatDef = new StatisticDefinition();
        countStatDef.statisticType = "count";
        countStatDef.onStatisticField = sqlExpression;
        countStatDef.outStatisticFieldName = "numBlockGroups";


        // Set the base parameters for the query. All statistic definition objects
        // are passed as an array into the outStatistics param
        var queryParams = new Query();
           // Recuperamos valor introducido por el usurario y la introducimos como parámetro
        var radio = RadioB.value;
        queryParams.distance = radio;
        //queryParams.distance = 1;  // Return all block groups within one mile of the point
        queryParams.units = "kilometers";
        queryParams.outFields = fields;
//        queryParams.outStatistics = [ minStatDef, maxStatDef, avgStatDef, countStatDef, stddevStatDef ];
        queryParams.outStatistics = [ minStatDef, maxStatDef, countStatDef ];

        // Executes on each map click
        function getPoint(evt){

          // Set the location of the mouse click event to the query parameters
          var point = evt.mapPoint;
          queryParams.geometry = point;

          // Clear the graphics from any previous queries
//          this.map.graphics.clear();  // Ahora this no es para map, sino para evt
            this.graphics.clear();

          // Add a point graphic represting the location clicked on the map
          var ptGraphic = new Graphic(point, pointSymbol);
//          this.map.graphics.add(ptGraphic);
            this.graphics.add(ptGraphic);

          // Add a graphic representing a one-mile buffer around the clicked point
          // geodesicBuffer es un método de geometryEngine
          // Esto equivale a hacer un Buffer geodésico en ArcMap. Devuelve un polígono 
          // La variable "buffer" es ahora un polígono
          var buffer = geometryEngine.geodesicBuffer(point, radio, "kilometers");
          var bufferGraphic = new Graphic(buffer, buffSymbol);
//          this.map.graphics.add(bufferGraphic);
            this.graphics.add(bufferGraphic);

          // Execute the statistics query against the feature service and call the getStats() callback
          // queryFeatures es un método de FeatureLayer
          blockGroupsLyr.queryFeatures(queryParams, getStats, errback);
        }

        // Executes on each query
        function getStats(results){
          // The return object of the query containing the statistics requested
          var stats = results.features[0].attributes;

          // Print the statistic results to the DOM
          // Este muestra el número de barrios que intersectan con el buffer
          dom.byId("muestradelito").innerHTML = aa.value;
          dom.byId("countResult").innerHTML = Math.round(stats.numBlockGroups);
          dom.byId("minResult").innerHTML = Math.round(stats.minPopDensity) + " delitos";
          dom.byId("maxResult").innerHTML = Math.round(stats.maxPopDensity) + " delitos";
            x = document.getElementById("muestradelito");
            

        }

        function errback(err){
          console.log("Couldn't retrieve summary statistics. ", err);
//            console.log("Couldn't retrieve summary statistics. ")
            
        }
           
           
           
           
       },
        
        
       miFuncionClear: function(){ 
            this.map.graphics.clear();
       
       },

      onClose: function(){
        console.log('onClose');
        this.map.on("click", nada);
        function nada() {};
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
