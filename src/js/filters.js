'use strict'

var twitchFCC = window.twitchFCC = window.twitchFCC || {}

twitchFCC.filters = {
  init () {
    const filters = document.querySelector('.filters')

    filters.addEventListener('click', this.filtersClickListener.bind(this))
  },

  filtersClickListener (e) {
    const targetID = e.target.id
    const nodeName = e.target.nodeName.toLowerCase()

    if (nodeName === 'span') {
      this.setActiveFilter(targetID)
      this.filterList(targetID)
    }
  },

  setActiveFilter (nextActiveFilter) {
    const activeFilter = document.querySelector('.active')
    const targetFilter = document.querySelector(`#${nextActiveFilter}`)

    if (activeFilter.classList.contains(nextActiveFilter)) {
      return
    }

    activeFilter.classList.remove('active')
    targetFilter.classList.add('active')
  },

  filterList (targetID) {
    const filterType = targetID.split('--')[1]
    const streams = document.querySelectorAll('.streams_container--item')

    switch (filterType) {
      case 'all':
        streams.forEach(node => {
          if (node.classList.contains('hide')) {
            node.classList.remove('hide')
          }
        })
        break
      case 'online':
        streams.forEach(node => {
          if (node.classList.contains('offline')) {
            node.classList.add('hide')
          } else if (node.classList.contains('online')) {
            node.classList.remove('hide')
          }
        })
        break
      case 'offline':
        streams.forEach(node => {
          if (node.classList.contains('online')) {
            node.classList.add('hide')
          } else if (node.classList.contains('offline')) {
            node.classList.remove('hide')
          }
        })
        break
    }
  }
}
