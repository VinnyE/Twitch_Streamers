'use strict'

var twitchFCC = window.twitchFCC = window.twitchFCC || {}

twitchFCC.streamListing = {
  init () {
    PubSub.subscribe('FORMAT_DATA', this.formatData.bind(this))
    PubSub.subscribe('APPEND_DATA', this.appendHTML.bind(this))
  },

  formatData (event, streamsArr) {
    let listItems = streamsArr.map(streamInfo => {
      let html 
      if (streamInfo.online) {
        html =  `<li class="streams_container--item"><p>Name: ${streamInfo.name}</p><p>Status: ONLINE </p><p>Playing: ${streamInfo.stream.game}</p></li>`
      } else {
        html = `<li class="streams_container--item"><p>Name: ${streamInfo.name}</p><p>Status: OFFLINE </p></li>`
      }

      return html
    })

    PubSub.publish('GET_FORMATTED_DATA', listItems)
  },

  appendHTML (event, data) {
    let streamsContainer = document.querySelector(data.target)
    streamsContainer.insertAdjacentHTML('beforeend', data.htmlArr.join(''))
  }
}
