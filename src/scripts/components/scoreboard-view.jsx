import React from 'react'
import DocumentTitle from 'react-document-title'

import Spacing from 'material-ui/styles/spacing'
import Paper from 'material-ui/Paper'

import ScoreTableView from './score-table-view'

import TeamActions from '../actions/team-actions'
import TeamStore from '../stores/team-store'

import ServiceActions from '../actions/service-actions'
import ServiceStore from '../stores/service-store'

import TeamServicePushStateActions from '../actions/team-service-push-state-actions'
import TeamServicePushStateStore from '../stores/team-service-push-state-store'

import TeamServicePullStateActions from '../actions/team-service-pull-state-actions'
import TeamServicePullStateStore from '../stores/team-service-pull-state-store'

import ScoreboardActions from '../actions/scoreboard-actions'
import ScoreboardStore from '../stores/scoreboard-store'

import Customize from '../../../customize'

export default class ScoreboardView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      teams: TeamStore.getState(),
      services: ServiceStore.getState(),
      teamServicePushStates: TeamServicePushStateStore.getState(),
      teamServicePullStates: TeamServicePullStateStore.getState(),
      scoreboard: ScoreboardStore.getState()
    }

    this.onUpdateTeams = this.onUpdateTeams.bind(this)
    this.onUpdateServices = this.onUpdateServices.bind(this)
    this.onUpdateTeamServicePushStates = this.onUpdateTeamServicePushStates.bind(this)
    this.onUpdateTeamServicePullStates = this.onUpdateTeamServicePullStates.bind(this)
    this.onUpdateScoreboard = this.onUpdateScoreboard.bind(this)
  }

  onUpdateTeams (teams) {
    this.setState({
      teams: teams
    })
  }

  onUpdateServices (services) {
    this.setState({
      services: services
    })
  }

  onUpdateTeamServicePushStates (teamServicePushStates) {
    this.setState({
      teamServicePushStates: teamServicePushStates
    })
  }

  onUpdateTeamServicePullStates (teamServicePullStates) {
    this.setState({
      teamServicePullStates: teamServicePullStates
    })
  }

  onUpdateScoreboard (scoreboard) {
    this.setState({
      scoreboard: scoreboard
    })
  }

  calculateTable () {
    let order = [
      'rank',
      'team',
      'totalRelative',
      'attack',
      'availability',
      'defence'
    ]

    let headers = {
      rank: {
        title: 'Rank'
      },
      team: {
        title: 'Team'
      },
      totalRelative: {
        title: 'Score'
      },
      attack: {
        title: 'Attack'
      },
      availability: {
        title: 'Availability'
      },
      defence: {
        title: 'Defence'
      }
    }

    for (let service of this.state.services.collection) {
      let serviceId = `#service_${service.id}`
      headers[serviceId] = {
        title: service.name,
        style: {
          textAlign: 'center'
        }
      }
      order.push(serviceId)
    }

    let rowData = []

    for (let position of this.state.scoreboard.model.positions) {
      let team = this.state.teams.collection.find((team) => {
        return position.teamId === team.id
      })

      let row = {
        id: team.id,
        team: team.name,
        totalRelative: position.totalRelative,
        attackPoints: position.attackPoints,
        availabilityPoints: position.availabilityPoints,
        defencePoints: position.defencePoints,
        attackRelative: position.attackRelative,
        availabilityRelative: position.availabilityRelative,
        defenceRelative: position.defenceRelative,
        lastAttack: position.lastAttack,
        guest: team.guest
      }

      for (let service of this.state.services.collection) {
        let serviceId = `#service_${service.id}`
        let teamServicePushState = this.state.teamServicePushStates.collection.find((state) => {
          return state.teamId === team.id && state.serviceId === service.id
        })
        let teamServicePullState = this.state.teamServicePullStates.collection.find((state) => {
          return state.teamId === team.id && state.serviceId === service.id
        })
        row[serviceId] = {
          push: {
            value: teamServicePushState ? teamServicePushState.state : 0,
            updated: teamServicePushState ? teamServicePushState.updatedAt : null,
            message: teamServicePushState ? teamServicePushState.message : null
          },
          pull: {
            value: teamServicePullState ? teamServicePullState.state : 0,
            updated: teamServicePullState ? teamServicePullState.updatedAt : null,
            message: teamServicePullState ? teamServicePullState.message : null
          }
        }
      }

      rowData.push(row)
    }

    let rows = rowData.map((row, ndx) => {
      row['rank'] = ndx + 1
      return row
    })

    return {
      order: order,
      rows: rows,
      headers: headers,
      muted: this.state.scoreboard.model.muted
    }
  }

  componentDidMount () {
    TeamStore.listen(this.onUpdateTeams)
    ServiceStore.listen(this.onUpdateServices)
    TeamServicePushStateStore.listen(this.onUpdateTeamServicePushStates)
    TeamServicePullStateStore.listen(this.onUpdateTeamServicePullStates)
    ScoreboardStore.listen(this.onUpdateScoreboard)

    TeamActions.fetch()
    ServiceActions.fetch()
    TeamServicePushStateActions.fetch()
    TeamServicePullStateActions.fetch()
    ScoreboardActions.fetch()
  }

  componentWillUnmount () {
    TeamStore.unlisten(this.onUpdateTeams)
    ServiceStore.unlisten(this.onUpdateServices)
    TeamServicePushStateStore.unlisten(this.onUpdateTeamServicePushStates)
    TeamServicePullStateStore.unlisten(this.onUpdateTeamServicePullStates)
    ScoreboardStore.unlisten(this.onUpdateScoreboard)
  }

  isLoading () {
    return (
      this.state.teams.loading ||
      this.state.services.loading ||
      this.state.teamServicePushStates.loading ||
      this.state.teamServicePullStates.loading ||
      this.state.scoreboard.loading
    )
  }

  isError () {
    return (
      this.state.teams.err ||
      this.state.services.err ||
      this.state.teamServicePushStates.err ||
      this.state.teamServicePullStates.err ||
      this.state.scoreboard.err
    )
  }

  render () {
    let style = {
      paddingTop: '15px',
      paddingBottom: '15px',
      paddingLeft: Spacing.desktopGutter,
      paddingRight: Spacing.desktopGutter
    }

    let title = `${Customize.contestTitle} :: Scoreboard`

    return (
      <DocumentTitle title={title}>
        <Paper zDepth={0} style={style}>
          <h2>Scoreboard</h2>
          {
            (() => {
              if (this.isLoading()) {
                return <p>Loading</p>
              }

              if (this.isError()) {
                return <p>Failed to fetch scoreboard data</p>
              }

              return <ScoreTableView identity={this.props.identity} table={this.calculateTable()} />
            })()
          }
        </Paper>
      </DocumentTitle>
    )
  }
}
