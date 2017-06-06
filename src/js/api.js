'use strict'

var twitchFCC = window.twitchFCC = window.twitchFCC || {}

twitchFCC.fetchApi = {
  init () {
    PubSub.subscribe('GET_DATA', twitchFCC.fetchApi.fetchStreamData)
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
          PubSub.publish('STREAM_DATA', streamInfo)
        },
        error: data => {
          console.error(`AN ERROR OCCURED IN YOUR REQUEST: ${data}`)
        }
      })
    })
  }
}
