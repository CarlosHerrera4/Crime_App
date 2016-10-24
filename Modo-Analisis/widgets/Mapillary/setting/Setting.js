/* globals define */
define([
  'dojo/_base/declare',
  'jimu/BaseWidgetSetting'
],
function (declare, BaseWidgetSetting) {
  return declare([BaseWidgetSetting], {
    baseClass: 'mapillary-setting',

    postCreate: function () {
      // the config object is passed in
      this.setConfig(this.config)
    },

    setConfig: function (config) {
      this.defaultCoverage.checked = config.defaultCoverage
      this.clientId.value = config.clientId ? config.clientId : ''
    },

    getConfig: function () {
      // WAB will get config object through this method
      return {
        defaultCoverage: this.defaultCoverage.checked,
        clientId: this.clientId.value
      }
    }
  })
})
