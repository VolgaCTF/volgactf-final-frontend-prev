import React from 'react'
import { blueGrey50, blueGrey600 } from 'material-ui/styles/colors'

import CompetitionRoundStore from '../stores/competition-round-store'
import CompetitionRoundActions from '../actions/competition-round-actions'

export default class CompetitionRoundView extends React.Component {
  constructor (props) {
    super(props)
    this.state = CompetitionRoundStore.getState()

    this.onUpdate = this.onUpdate.bind(this)
  }

  componentDidMount () {
    CompetitionRoundStore.listen(this.onUpdate)
    CompetitionRoundActions.fetch()
  }

  componentWillUnmount () {
    CompetitionRoundStore.unlisten(this.onUpdate)
  }

  onUpdate (state) {
    this.setState(state)
  }

  render () {
    if (this.state.loading) {
      return <span></span>
    }

    if (this.state.err) {
      return <span>Failed to fetch competition round</span>
    }

    if (this.state.model.value == null) {
      return <span></span>
    }

    let style = {
      padding: '4px 8px',
      marginRight: '10px',
      color: blueGrey600,
      backgroundColor: blueGrey50
    }

    return <span style={style}>{`Round ${this.state.model.value}`}</span>
  }
}
