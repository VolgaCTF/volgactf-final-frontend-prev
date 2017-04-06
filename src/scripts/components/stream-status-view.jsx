import React from 'react'
import { deepOrange50, deepOrange500, yellow50, yellow800, green50, green700, red50, red600, grey100, grey600 } from 'material-ui/styles/colors'
import eventManager from '../utils/event-manager'

export default class StreamStatusView extends React.Component {
  constructor (props) {
    super(props)
    this.interval = null
    this.state = {
      readyState: null
    }

    this.update = () => {
      this.setState({
        readyState: eventManager.enabled ? eventManager.eventSource.readyState : -1
      })
    }
  }

  componentDidMount () {
    this.interval = window.setInterval(this.update, 2000)
    this.update()
  }

  componentWillUnmount () {
    if (this.interval) {
      window.clearInterval(this.interval)
      this.interval = null
    }
  }

  render () {
    let style = {
      padding: '4px 8px',
      marginRight: '10px'
    }
    let text = null
    switch (this.state.readyState) {
      case -1:
        text = 'not supported'
        style.color = deepOrange500
        style.backgroundColor = deepOrange50
        break
      case 0:
        text = 'connecting'
        style.color = yellow800
        style.backgroundColor = yellow50
        break
      case 1:
        text = 'connected'
        style.color = green700
        style.backgroundColor = green50
        break
      case 2:
        text = 'closed'
        style.color = red600
        style.backgroundColor = red50
        break
      default:
        text = 'n/a'
        style.color = grey600
        style.backgroundColor = grey100
        break
    }
    return <span style={style}>{`Stream: ${text}`}</span>
  }
}
