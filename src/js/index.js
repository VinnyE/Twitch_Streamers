'use strict'

var twitchFCC = window.twitchFCC = window.twitchFCC || {}

window.addEventListener('load', e => {
  twitchFCC.streamListing.init()
  twitchFCC.fetchApi.init()

  PubSub.subscribe('GET_API_DATA', apiDataReceived)
  PubSub.subscribe('GET_FORMATTED_DATA', formattedDataReceived)
  
  PubSub.publish('GET_DATA', ['freecodecamp', 'ESL_SC2', 'OgamingSC2'])
})

const apiDataReceived = (event, streamData) => {
  PubSub.publish('FORMAT_DATA', streamData)
}

const formattedDataReceived = (event, formattedData) => {
  let dataObj = {
    htmlArr: formattedData, 
    target: '.streams_container'
  }

  PubSub.publish('APPEND_DATA', dataObj)
}

