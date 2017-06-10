'use strict'

var twitchFCC = window.twitchFCC = window.twitchFCC || {}

window.addEventListener('load', e => {
  twitchFCC.streamListing.init()
  twitchFCC.fetchApi.init()

  PubSub.subscribe('API_DATA_RECEIVED', apiDataReceived)
  PubSub.subscribe('FORMATTED_DATA_RECEIVED', formattedDataReceived)
  bindFilterListener();
  
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

const bindFilterListener = () => {
  const filters = document.querySelector('.filters');

  filters.addEventListener('click', (e) => {
    const targetClass = e.target.className;
    const nodeName = e.target.nodeName.toLowerCase();
    
    if (nodeName === 'span') {
      setActiveFilter(targetClass, filters);
    }
  });
}

const setActiveFilter = (nextActiveFilter, parentEl) => {
  const activeFilter = parentEl.querySelector('.active');
  const targetFilter = parentEl.querySelector(`.${nextActiveFilter}`);
  activeFilter.classList.remove('active');
  targetFilter.classList.add('active');
}
