define(['dojo/_base/declare', 
        'dojo/_base/lang', 
        'jimu/BaseWidget', 
        'esri/layers/FeatureLayer', 
        'dojo/_base/html',
        'dojo/on'],
  function(declare, lang, BaseWidget, FeatureLayer, html, on) {
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
         this.limpiaCapas();;
       },


       limpiaCapas: function(){

           //var numcapas = this.map.graphicsLayerIds.length;
           this.map.graphics.clear();
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