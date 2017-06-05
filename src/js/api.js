'use strict'

var twitchFCC = window.twitchFCC = window.twitchFCC || {}

twitchFCC.fetchApi = {
  fetchStreamData (msg, id) {
    JSONP({ // bypassing cors errors with JSONP. 
      url: `https://wind-bow.gomix.me/twitch-api/streams/${id}`,
      success: data => {
        console.log(data)
      },
      error: data => {
        console.error(`AN ERROR OCCURED IN YOUR REQUEST: ${data}`)
      }
    })
  }
}

PubSub.subscribe('GET_DATA', twitchFCC.fetchApi.fetchStreamData)