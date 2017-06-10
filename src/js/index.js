'use strict'

var twitchFCC = window.twitchFCC = window.twitchFCC || {}

window.addEventListener('DOMContentLoaded', e => {
  twitchFCC.streamListing.init()
  twitchFCC.fetchApi.init()
  twitchFCC.filters.init()

  PubSub.subscribe('API_DATA_RECEIVED', apiDataReceived)
  PubSub.subscribe('FORMATTED_DATA_RECEIVED', formattedDataReceived)

  PubSub.publish('GET_API_DATA', ['freecodecamp', 'ESL_SC2', 'OgamingSC2', 'storbeck', 'noobs2ninjas', 'RobotCaleb'])
})

const apiDataReceived = (event, streamData) => {
  PubSub.publish('GET_FORMATTED_DATA', streamData)
}

const formattedDataReceived = (event, formattedData) => {
  const dataObj = {
    htmlArr: formattedData,
    target: '.streams_container'
  }

  PubSub.publish('APPEND_DATA', dataObj)
}
