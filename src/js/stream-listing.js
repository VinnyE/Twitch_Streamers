'use strict'

var twitchFCC = window.twitchFCC = window.twitchFCC || {}

twitchFCC.streamListing = {
  init () {
    PubSub.subscribe('STREAM_DATA', this.gatherData.bind(this))
  },

  streams: [],

  gatherData (event, streamObj) {
    this.streams.push(streamObj)
    console.log(this.streams)
  }
}
