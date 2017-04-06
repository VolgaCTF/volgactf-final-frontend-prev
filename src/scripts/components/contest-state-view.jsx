import React from 'react'
import { blue50, blue900, grey100, grey600, green50, green700, brown50, brown600, deepOrange50, deepOrange500, red50, red600 } from 'material-ui/styles/colors'

import ContestStateStore from '../stores/contest-state-store'
import ContestStateActions from '../actions/contest-state-actions'

export default class ContestStateView extends React.Component {
  constructor (props) {
    super(props)
    this.state = ContestStateStore.getState()

    this.onUpdate = this.onUpdate.bind(this)
  }

  componentDidMount () {
    ContestStateStore.listen(this.onUpdate)
    ContestStateActions.fetch()
  }

  componentWillUnmount () {
    ContestStateStore.unlisten(this.onUpdate)
  }

  onUpdate (state) {
    this.setState(state)
  }

  render () {
    if (this.state.loading) {
      return <span></span>
    }

    if (this.state.err) {
      return <span>Failed to fetch contest state</span>
    }

    let style = {
      padding: '4px 8px',
      marginRight: '10px'
    }

    let text = null

    switch (this.state.model.value) {
      case 0:
        text = 'Contest not started'
        style.color = grey600
        style.backgroundColor = grey100
        break
      case 1:
        text = 'Contest will start soon'
        style.color = blue900
        style.backgroundColor = blue50
        break
      case 2:
        text = 'Contest running'
        style.color = green700
        style.backgroundColor = green50
        break
      case 3:
        text = 'Contest paused'
        style.color = brown600
        style.backgroundColor = brown50
        break
      case 4:
        text = 'Contest will be completed soon'
        style.color = deepOrange500
        style.backgroundColor = deepOrange50
        break
      case 5:
        text = 'Contest completed'
        style.color = red600
        style.backgroundColor = red50
        break
      default:
        text = 'Contest state n/a'
        style.color = grey600
        style.backgroundColor = grey100
        break
    }

    return <span style={style}>{text}</span>
  }
}
