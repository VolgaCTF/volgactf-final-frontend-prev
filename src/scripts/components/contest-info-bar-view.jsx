import React from 'react'

import Paper from 'material-ui/Paper'
import Spacing from 'material-ui/styles/spacing'

import ContestRoundView from './contest-round-view'
import ContestStateView from './contest-state-view'
import StreamStatusView from './stream-status-view'

export default class ContestInfoBarView extends React.Component {
  render () {
    let style = {
      paddingTop: '15px',
      paddingBottom: '15px',
      paddingLeft: Spacing.desktopGutter,
      paddingRight: Spacing.desktopGutter,
      marginTop: '64px'
    }

    return (
      <Paper style={style}>
        <ContestRoundView />
        <ContestStateView />
        <StreamStatusView />
      </Paper>
    )
  }
}
