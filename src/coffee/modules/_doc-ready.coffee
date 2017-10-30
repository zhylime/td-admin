###
  Every plugin initialization goes here.
###

$(document).ready ->

  testFunction = ->
    console.log "testFunction"
    return true

  # $('[data-js-plugin-name]').PluginName()