import React from 'react'

import Paper from 'material-ui/Paper'
import Spacing from 'material-ui/styles/spacing'

import CompetitionRoundView from './competition-round-view'
import CompetitionStageView from './competition-stage-view'
import StreamStatusView from './stream-status-view'

export default class CompetitionInfoBarView extends React.Component {
  render () {
    let style = {
      paddingTop: '15px',
      paddingBottom: '15px',
      paddingLeft: Spacing.desktopGutter,
      paddingRight: Spacing.desktopGutter,
      marginTop: '64px'
    }

    return (
      <Paper zDepth={0} rounded={false} style={style}>
        <CompetitionRoundView />
        <CompetitionStageView />
        <StreamStatusView />
      </Paper>
    )
  }
}
