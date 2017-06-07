'use strict'

var twitchFCC = window.twitchFCC = window.twitchFCC || {}

twitchFCC.streamListing = {
  init () {
    PubSub.subscribe('STREAM_DATA', this.formatData.bind(this))
  },

  formatData (event, streamsArr) {
    let listItem = streamsArr.map(streamInfo => {
      let html 
      if (streamInfo.online) {
        html =  `
          <li>
            <p>Name: ${streamInfo.name}<p>
            <p>Online: ONLINE </p>
            <p>Playing: ${streamInfo.stream.game}</p>
          </li>
       `
      } else {
        html = `
          <li>
            <p>Name: ${streamInfo.name}<p>
            <p>Online: OFFLINE </p>
          </li>
        `
      }
      return html
    })

    console.log(listItem)
  }
}
