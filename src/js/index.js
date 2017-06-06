'use strict'

var twitchFCC = window.twitchFCC = window.twitchFCC || {}

window.addEventListener('load', e => {
  twitchFCC.streamListing.init()
  twitchFCC.fetchApi.init()
  
  PubSub.publish('GET_DATA', ['freecodecamp', 'ESL_SC2', 'OgamingSC2'])
})

// Class for the server call.
// Pub/sub implementation
// format data in html class
