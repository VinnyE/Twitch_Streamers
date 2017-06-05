'use strict'

var twitchFCC = window.twitchFCC = window.twitchFCC || {}

window.addEventListener('load', e => {
  PubSub.publish('GET_DATA', 'freecodecamp')
})


// Class for the server call.
// Pub/sub implementation
// format data in html class