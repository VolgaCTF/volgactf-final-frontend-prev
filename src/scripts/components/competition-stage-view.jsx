import React from 'react'
import { blue50, blue900, grey100, grey600, green50, green700, brown50, brown600, deepOrange50, deepOrange500, red50, red600, yellow800, yellow50 } from 'material-ui/styles/colors'

import CompetitionStageStore from '../stores/competition-stage-store'
import CompetitionStageActions from '../actions/competition-stage-actions'

import ImageTimer from 'material-ui/svg-icons/image/timer'

export default class CompetitionStageView extends React.Component {
  constructor (props) {
    super(props)
    this.state = CompetitionStageStore.getState()

    this.onUpdate = this.onUpdate.bind(this)
  }

  componentDidMount () {
    CompetitionStageStore.listen(this.onUpdate)
    CompetitionStageActions.fetch()
  }

  componentWillUnmount () {
    CompetitionStageStore.unlisten(this.onUpdate)
  }

  onUpdate (state) {
    this.setState(state)
  }

  render () {
    if (this.state.loading) {
      return <span></span>
    }

    if (this.state.err) {
      return <span>Failed to fetch competition stage</span>
    }

    let style = {
      padding: '4px 8px',
      marginRight: '10px'
    }

    let text = null

    switch (this.state.model.value) {
      case 0:
        text = 'Competition: not started'
        style.color = grey600
        style.backgroundColor = grey100
        break
      case 1:
        text = 'Competition: starting'
        style.color = blue900
        style.backgroundColor = blue50
        break
      case 2:
        text = 'Competition: started'
        style.color = green700
        style.backgroundColor = green50
        break
      case 3:
        text = 'Competition: pausing'
        style.color = yellow800
        style.backgroundColor = yellow50
        break
      case 4:
        text = 'Competition: paused'
        style.color = brown600
        style.backgroundColor = brown50
        break
      case 5:
        text = 'Competition: finishing'
        style.color = deepOrange500
        style.backgroundColor = deepOrange50
        break
      case 6:
        text = 'Competition: finished'
        style.color = red600
        style.backgroundColor = red50
        break
      default:
        text = 'Competition: n/a'
        style.color = grey600
        style.backgroundColor = grey100
        break
    }

    return <span style={style}>{text}</span>
  }
}
