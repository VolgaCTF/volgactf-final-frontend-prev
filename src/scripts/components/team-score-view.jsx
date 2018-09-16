import React from 'react'
import DocumentTitle from 'react-document-title'

import Spacing from 'material-ui/styles/spacing'
import Paper from 'material-ui/Paper'

import TeamScoreTableView from './team-score-table-view'

import TeamActions from '../actions/team-actions'
import TeamStore from '../stores/team-store'

import TeamScoreActions from '../actions/team-score-actions'
import createTeamScoreStore from '../stores/team-score-store'

import Customize from '../../../customize'

export default class TeamScoreView extends React.Component {
  constructor (props) {
    super(props)
    this.teamId = null
    if (this.props.route.identity.isTeam()) {
      this.teamId = this.props.route.identity.getId()
    } else if (this.props.route.identity.isInternal()) {
      this.teamId = parseInt(this.props.params.teamIdStr)
    }

    this.teamScoreStore = createTeamScoreStore(this.teamId)
    this.state = {
      teams: TeamStore.getState(),
      teamScores: this.teamScoreStore.getState()
    }

    this.onUpdateTeams = this.onUpdateTeams.bind(this)
    this.onUpdateTeamScores = this.onUpdateTeamScores.bind(this)
  }

  onUpdateTeams (teams) {
    this.setState({
      teams: teams
    })
  }

  onUpdateTeamScores (teamScores) {
    this.setState({
      teamScores: teamScores
    })
  }

  calculateTable () {
    const order = [
      'round',
      'totalPoints',
      'attackPoints',
      'availabilityPoints',
      'defencePoints'
    ]

    const headers = {
      round: {
        title: 'Round'
      },
      totalPoints: {
        title: 'Score'
      },
      attackPoints: {
        title: 'Attack'
      },
      availabilityPoints: {
        title: 'Availability'
      },
      defencePoints: {
        title: 'Defence'
      }
    }

    let rows = []

    for (const score of this.state.teamScores.collection) {
      const row = {
        id: score.id,
        round: score.roundId,
        totalPoints: score.attackPoints + score.availabilityPoints + score.defencePoints,
        attackPoints: score.attackPoints,
        availabilityPoints: score.availabilityPoints,
        defencePoints: score.defencePoints
      }

      rows.push(row)
    }

    return {
      order: order,
      rows: rows,
      headers: headers
    }
  }

  componentDidMount () {
    TeamStore.listen(this.onUpdateTeams)
    this.teamScoreStore.listen(this.onUpdateTeamScores)

    TeamActions.fetch()
    TeamScoreActions.fetch(this.props.route.identity, this.teamId)
  }

  componentWillUnmount () {
    TeamStore.unlisten(this.onUpdateTeams)
    this.teamScoreStore.unlisten(this.onUpdateTeamScores)
  }

  isLoading () {
    return (
      this.state.teams.loading ||
      this.state.teamScores.loading
    )
  }

  isError () {
    return (
      this.state.teams.err ||
      this.state.teamScores.err
    )
  }

  render () {
    let style = {
      paddingTop: '15px',
      paddingBottom: '15px',
      paddingLeft: Spacing.desktopGutter,
      paddingRight: Spacing.desktopGutter
    }

    const title = `${Customize.competitionTitle} :: Team stats`

    return (
      <DocumentTitle title={title}>
        <Paper zDepth={0} style={style}>
          {
            (() => {
              if (this.isLoading()) {
                return <p>Loading</p>
              }

              if (this.isError()) {
                return <p>Failed to fetch scoreboard data</p>
              }

              const team = this.state.teams.collection.find((team) => {
                return this.teamId === team.id
              })

              return (
                <div>
                  <h2>{team.name}&nbsp;&ndash;&nbsp;team stats</h2>
                  <TeamScoreTableView identity={this.props.identity} table={this.calculateTable()} />
                </div>
              )
            })()
          }
        </Paper>
      </DocumentTitle>
    )
  }
}
