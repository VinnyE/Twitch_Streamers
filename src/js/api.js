'use strict'

var twitchFCC = window.twitchFCC = window.twitchFCC || {}

twitchFCC.fetchApi = {
  init () {
    PubSub.subscribe('GET_API_DATA', twitchFCC.fetchApi.fetchStreamData.bind(this))
  },

  streams: [],

  checkTotalStreams (totalUsers) {
    if (this.streams.length === totalUsers) {
      PubSub.publish('API_DATA_RECEIVED', this.streams)
    }
  },

  fetchStreamData (msg, ids) {
    ids.forEach((id) => {
      JSONP({ // bypassing cors errors with JSONP.
        url: `https://wind-bow.gomix.me/twitch-api/streams/${id}`,
        success: data => {
          let streamInfo = {
            name: id,
            online: data.stream != null,
            stream: data.stream || 'OFFLINE'
          }

          this.streams.push(streamInfo)
          this.checkTotalStreams(ids.length)
        },
        error: data => {
          console.error(`AN ERROR OCCURED IN YOUR REQUEST: ${data}`)
        }
      })
    }, this)
  }
}
