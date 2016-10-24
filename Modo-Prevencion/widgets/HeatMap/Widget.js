define(['dojo/_base/declare', 
        'jimu/BaseWidget',
        'dojo/number',
        'esri/InfoTemplate',
        'esri/layers/FeatureLayer',
        'esri/renderers/HeatmapRenderer',
        'dojo/domReady!'    
       ],
  function(declare, BaseWidget, number, InfoTemplate, FeatureLayer, HeatmapRenderer) {
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

        onOpen: function(urlfinal){
            console.log('onOpen');
            
            var urlfinal = "http://services6.arcgis.com/ISJgswKTd7DKhcLN/ArcGIS/rest/services/DivisionesAdministrativas/FeatureServer/0";
            formatMagnitude = function (value, key, data){
                return number.format(value, {places: 1, locale: "en-us"});
            };
            

            var infoTemplate = new InfoTemplate("HotSpot",
              "Nombre barrio: ${Barrio}<br>Distrito: ${Distrito}");
            
          
            // Opciones de la capa para el HeatMap
            var heatmapFeatureLayerOptions = {
              mode: FeatureLayer.MODE_SNAPSHOT,
              //outFields: ["Name", "Magnitude"],
              outFields: ["Barrio", "Distrito","NUM_SEMANA"],
              infoTemplate: infoTemplate
            };
            // Construimos la FeatureLayer a calcular el HeatMap
            heatmapFeatureLayer = new FeatureLayer(urlfinal, heatmapFeatureLayerOptions);
            
            // Controles del HeatMap
            var blurCtrl = document.getElementById("blurControl"); // Control de desenfoque
            var maxCtrl = document.getElementById("maxControl");
            var minCtrl = document.getElementById("minControl");
            var valCtrl = document.getElementById("valueControl");
            
            // Creamos un renderer de HeatMap
            var heatmapRenderer = new HeatmapRenderer({
//              field: "Magnitude",
              field: "NUM_SEMANA",
              blurRadius: blurCtrl.value,
              maxPixelIntensity: maxCtrl.value,
              minPixelIntensity: minCtrl.value
            });
            
            // Le pasamos el renderer creado a la FeatureLayer
            heatmapFeatureLayer.setRenderer(heatmapRenderer);
            this.map.addLayer(heatmapFeatureLayer);

            /** Add event handlers for interactivity **/
            // Eventos de interacción
            var sliders = document.querySelectorAll(".blurInfo p~input[type=range]");
            var addLiveValue = function (ctrl){
              var val = ctrl.previousElementSibling.querySelector("span");
              ctrl.addEventListener("input", function (evt){
                val.innerHTML = evt.target.value;
              });
            };
            for (var i = 0; i < sliders.length; i++) {
              addLiveValue(sliders.item(i));
            }
            
            // Cuando cambia el valor, cambiar el heatmap, estableciéndole el nuevo renderer
            blurCtrl.addEventListener("change", function (evt){
              var r = +evt.target.value;
              if (r !== heatmapRenderer.blurRadius) {
                heatmapRenderer.blurRadius = r;
                heatmapFeatureLayer.redraw();
              }
            });
            maxCtrl.addEventListener("change", function (evt){
              var r = +evt.target.value;
              if (r !== heatmapRenderer.maxPixelIntensity) {
                heatmapRenderer.maxPixelIntensity = r;
                heatmapFeatureLayer.redraw();
              }
            });
            minCtrl.addEventListener("change", function (evt){
              var r = +evt.target.value;
              if (r !== heatmapRenderer.minPixelIntensity) {
                heatmapRenderer.minPixelIntensity = r;
                heatmapFeatureLayer.redraw();
              }
            });
          
            valCtrl.addEventListener("change", function (evt){
              var chk = evt.target.checked;
              if (!chk) {
                document.getElementById("maxValue").innerHTML = 21;
                maxCtrl.value = 21;
                heatmapRenderer.maxPixelIntensity = 21;
              }
              else {
                document.getElementById("maxValue").innerHTML = 250;
                maxCtrl.value = 250;
                heatmapRenderer.maxPixelIntensity = 250;

              }
              heatmapRenderer.field = (chk) ? "Robos_2012" : null;
//              heatmapRenderer.field = (chk) ? "Magnitude" : null;
              heatmapFeatureLayer.redraw();
            });
            
            
            
            
            
            
            
            
            
       },

        myFunction: function() {
            
            var url = "http://services6.arcgis.com/ISJgswKTd7DKhcLN/arcgis/rest/services/Incidentes_Madrid/FeatureServer";
            var tipodelito = document.getElementById("delito").value;
            var tipoanio = document.getElementById("anio").value;
            //console.log(this.map.graphicsLayerIds);
            // Buscamos la layer que crea el primer HeatMap y la borramos
            // Creo que si abro otro widget que cree otra capa antes, la layer 1 ya no coincidirá con la del heatmap
            //var gl = this.map.getLayer(this.map.graphicsLayerIds[1]);
            this.map.removeLayer(heatmapFeatureLayer);
            //this.map.removeAllLayers();
            
            
            if (tipodelito == "Atracos_joyerias") {
                if (tipoanio == "2008") {
                    var urlfinal = url + "/13";
                } else if (tipoanio == "2009") {
                    var urlfinal = url + "/12";
                } else if (tipoanio == "2010") {
                    var urlfinal = url + "/11";
                } else if (tipoanio == "2011") {
                    var urlfinal = url + "/10";
                } else if (tipoanio == "2012") {
                    var urlfinal = url + "/9";
                } else if (tipoanio == "2013") {
                    var urlfinal = url + "/8";
                }
            } else if (tipodelito == "Hurto") {
                if (tipoanio == "2008") {
                    var urlfinal = url + "/6";
                } else if (tipoanio == "2009") {
                    var urlfinal = url + "/5";
                } else if (tipoanio == "2010") {
                    var urlfinal = url + "/4";
                } else if (tipoanio == "2011") {
                    var urlfinal = url + "/3";
                } else if (tipoanio == "2012") {
                    var urlfinal = url + "/2";
                } else if (tipoanio == "2013") {
                    var urlfinal = url + "/1";
                }
            
            } else if (tipodelito == "Robos") {
                if (tipoanio == "2008") {
                    var urlfinal = url + "/55";
                } else if (tipoanio == "2009") {
                    var urlfinal = url + "/54";
                } else if (tipoanio == "2010") {
                    var urlfinal = url + "/53";
                } else if (tipoanio == "2011") {
                    var urlfinal = url + "/52";
                } else if (tipoanio == "2012") {
                    var urlfinal = url + "/51";
                } else if (tipoanio == "2013") {
                    var urlfinal = url + "/50";
                }
            
            } else if (tipodelito == "Robos_con_violencia") {
                if (tipoanio == "2008") {
                    var urlfinal = url + "/62";
                } else if (tipoanio == "2009") {
                    var urlfinal = url + "/61";
                } else if (tipoanio == "2010") {
                    var urlfinal = url + "/60";
                } else if (tipoanio == "2011") {
                    var urlfinal = url + "/59";
                } else if (tipoanio == "2012") {
                    var urlfinal = url + "/58";
                } else if (tipoanio == "2013") {
                    var urlfinal = url + "/57";
                }
            
            } else if (tipodelito == "Robos_con_violencia_en_viviendas") {
                if (tipoanio == "2008") {
                    var urlfinal = url + "/20";
                } else if (tipoanio == "2009") {
                    var urlfinal = url + "/19";
                } else if (tipoanio == "2010") {
                    var urlfinal = url + "/18";
                } else if (tipoanio == "2011") {
                    var urlfinal = url + "/17";
                } else if (tipoanio == "2012") {
                    var urlfinal = url + "/16";
                } else if (tipoanio == "2013") {
                    var urlfinal = url + "/15";
                }
            
            } else if (tipodelito == "Robos_fuerza_en_las_cosas_viviendas") {
                if (tipoanio == "2008") {
                    var urlfinal = url + "/41";
                } else if (tipoanio == "2009") {
                    var urlfinal = url + "/40";
                } else if (tipoanio == "2010") {
                    var urlfinal = url + "/39";
                } else if (tipoanio == "2011") {
                    var urlfinal = url + "/38";
                } else if (tipoanio == "2012") {
                    var urlfinal = url + "/37";
                } else if (tipoanio == "2013") {
                    var urlfinal = url + "/36";
                }
            
            } else if (tipodelito == "Sustraccion_vehiculos") {
                if (tipoanio == "2008") {
                    var urlfinal = url + "/34";
                } else if (tipoanio == "2009") {
                    var urlfinal = url + "/33";
                } else if (tipoanio == "2010") {
                    var urlfinal = url + "/32";
                } else if (tipoanio == "2011") {
                    var urlfinal = url + "/31";
                } else if (tipoanio == "2012") {
                    var urlfinal = url + "/30";
                } else if (tipoanio == "2013") {
                    var urlfinal = url + "/29";
                }
            
            } else if (tipodelito == "Tirones_via_publica") {
                if (tipoanio == "2008") {
                    var urlfinal = url + "/27";
                } else if (tipoanio == "2009") {
                    var urlfinal = url + "/26";
                } else if (tipoanio == "2010") {
                    var urlfinal = url + "/25";
                } else if (tipoanio == "2011") {
                    var urlfinal = url + "/24";
                } else if (tipoanio == "2012") {
                    var urlfinal = url + "/23";
                } else if (tipoanio == "2013") {
                    var urlfinal = url + "/22";
                }
            
            } 
            
            
           
           this.map.on("layers-removed");
            
           formatMagnitude = function (value, key, data){
                return number.format(value, {places: 1, locale: "en-us"});
            };
            
            // InfoTemplate cundo clicamos en alguna zona

            var infoTemplate = new InfoTemplate("HotSpot",
              "Nombre barrio: ${Barrio}<br>Distrito: ${Distrito}");
            
            // URL del servicio

            // Opciones de la capa para el HeatMap
            var heatmapFeatureLayerOptions = {
              mode: FeatureLayer.MODE_SNAPSHOT,
              //outFields: ["Name", "Magnitude"],
              outFields: ["Barrio", "Distrito","NUM_SEMANA"],
              infoTemplate: infoTemplate
            };
            // Construimos la FeatureLayer a calcular el HeatMap
            heatmapFeatureLayer = new FeatureLayer(urlfinal, heatmapFeatureLayerOptions);
            
            // Controles del HeatMap
            var blurCtrl = document.getElementById("blurControl"); // Control de desenfoque
            var maxCtrl = document.getElementById("maxControl");
            var minCtrl = document.getElementById("minControl");
            var valCtrl = document.getElementById("valueControl");
            
            // Creamos un renderer de HeatMap
            var heatmapRenderer = new HeatmapRenderer({
//              field: "Magnitude",
              field: "NUM_SEMANA",
              blurRadius: blurCtrl.value,
              maxPixelIntensity: maxCtrl.value,
              minPixelIntensity: minCtrl.value
            });
            
            // Le pasamos el renderer creado a la FeatureLayer
            heatmapFeatureLayer.setRenderer(heatmapRenderer);
            this.map.addLayer(heatmapFeatureLayer);

            /** Add event handlers for interactivity **/
            // Eventos de interacción
            var sliders = document.querySelectorAll(".blurInfo p~input[type=range]");
            var addLiveValue = function (ctrl){
              var val = ctrl.previousElementSibling.querySelector("span");
              ctrl.addEventListener("input", function (evt){
                val.innerHTML = evt.target.value;
              });
            };
            for (var i = 0; i < sliders.length; i++) {
              addLiveValue(sliders.item(i));
            }
            
            // Cuando cambia el valor, cambiar el heatmap, estableciéndole el nuevo renderer
            blurCtrl.addEventListener("change", function (evt){
              var r = +evt.target.value;
              if (r !== heatmapRenderer.blurRadius) {
                heatmapRenderer.blurRadius = r;
                heatmapFeatureLayer.redraw();
              }
            });
            maxCtrl.addEventListener("change", function (evt){
              var r = +evt.target.value;
              if (r !== heatmapRenderer.maxPixelIntensity) {
                heatmapRenderer.maxPixelIntensity = r;
                heatmapFeatureLayer.redraw();
              }
            });
            minCtrl.addEventListener("change", function (evt){
              var r = +evt.target.value;
              if (r !== heatmapRenderer.minPixelIntensity) {
                heatmapRenderer.minPixelIntensity = r;
                heatmapFeatureLayer.redraw();
              }
            });
           
            valCtrl.addEventListener("change", function (evt){
              var chk = evt.target.checked;
              if (!chk) {
                document.getElementById("maxValue").innerHTML = 21;
                maxCtrl.value = 21;
                heatmapRenderer.maxPixelIntensity = 21;
              }
              else {
                document.getElementById("maxValue").innerHTML = 250;
                maxCtrl.value = 250;
                heatmapRenderer.maxPixelIntensity = 250;

              }
              heatmapRenderer.field = (chk) ? "Robos_2012" : null;
//              heatmapRenderer.field = (chk) ? "Magnitude" : null;
              heatmapFeatureLayer.redraw();
            }); 
            
            
            
            
        }

      onClose: function(){
        console.log('onClose');
        debugger
        this.map.removeLayer(heatmapFeatureLayer);
        this.map.graphics.clear();
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