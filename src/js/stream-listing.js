'use strict'

var twitchFCC = window.twitchFCC = window.twitchFCC || {}

twitchFCC.streamListing = {
  init () {
    PubSub.subscribe('GET_FORMATTED_DATA', this.formatData.bind(this))
    PubSub.subscribe('APPEND_DATA', this.appendHTML.bind(this))
  },

  formatData (event, streamsArr) {
    let listItems = streamsArr.map(streamInfo => {
      let html 
      if (streamInfo.online) {
        html =  `<li class="streams_container--item"><p><span class="item-title">Name</span>: <a href=${streamInfo.stream.channel.url} target="_blank">${streamInfo.name}</a></p><p><span class="item-title">Status</span>: ONLINE </p><p><span class="item-title">Playing</span>: ${streamInfo.stream.game } - ${streamInfo.stream.channel.status}</p></li>`
      } else {
        html = `<li class="streams_container--item"><p><span class="item-title">Name</span>: ${streamInfo.name}</p><p><span class="item-title">Status</span>: OFFLINE </p></li>`
      }

      return html
    })

    PubSub.publish('FORMATTED_DATA_RECEIVED', listItems)
  },

  appendHTML (event, data) {
    let streamsContainer = document.querySelector(data.target)
    streamsContainer.insertAdjacentHTML('beforeend', data.htmlArr.join(''))
  }
}
