import React from 'react'
import DocumentTitle from 'react-document-title'

import Spacing from 'material-ui/styles/spacing'
import Paper from 'material-ui/Paper'

import ScoreTableView from './score-table-view'

import TeamActions from '../actions/team-actions'
import TeamStore from '../stores/team-store'

import ServiceActions from '../actions/service-actions'
import ServiceStore from '../stores/service-store'

import TeamServiceStateActions from '../actions/team-service-state-actions'
import TeamServiceStateStore from '../stores/team-service-state-store'

import ScoreboardActions from '../actions/scoreboard-actions'
import ScoreboardStore from '../stores/scoreboard-store'

import Customize from '../../../customize'

export default class ScoreboardView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      teams: TeamStore.getState(),
      services: ServiceStore.getState(),
      teamServiceStates: TeamServiceStateStore.getState(),
      scoreboard: ScoreboardStore.getState()
    }

    this.onUpdateTeams = this.onUpdateTeams.bind(this)
    this.onUpdateServices = this.onUpdateServices.bind(this)
    this.onUpdateTeamServiceStates = this.onUpdateTeamServiceStates.bind(this)
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

  onUpdateTeamServiceStates (teamServiceStates) {
    this.setState({
      teamServiceStates: teamServiceStates
    })
  }

  onUpdateScoreboard (scoreboard) {
    this.setState({
      scoreboard: scoreboard
    })
  }

  calculateTable () {
    let order = [
      'position',
      'team',
      'totalRelative',
      'attack',
      'availability',
      'defence'
    ]

    let headers = {
      position: '#',
      team: 'Team',
      totalRelative: 'Score',
      attack: 'Attack',
      availability: 'Availability',
      defence: 'Defence'
    }

    for (let service of this.state.services.collection) {
      let serviceId = `#service_${service.id}`
      headers[serviceId] = service.name
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
        let teamServiceState = this.state.teamServiceStates.collection.find((state) => {
          return state.teamId === team.id && state.serviceId === service.id
        })
        row[serviceId] = teamServiceState ? teamServiceState.state : 0
      }

      rowData.push(row)
    }

    let rows = rowData.map((row, ndx) => {
      row['position'] = ndx + 1
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
    TeamServiceStateStore.listen(this.onUpdateTeamServiceStates)
    ScoreboardStore.listen(this.onUpdateScoreboard)

    TeamActions.fetch()
    ServiceActions.fetch()
    TeamServiceStateActions.fetch()
    ScoreboardActions.fetch()
  }

  componentWillUnmount () {
    TeamStore.unlisten(this.onUpdateTeams)
    ServiceStore.unlisten(this.onUpdateServices)
    TeamServiceStateStore.unlisten(this.onUpdateTeamServiceStates)
    ScoreboardStore.unlisten(this.onUpdateScoreboard)
  }

  isLoading () {
    return (
      this.state.teams.loading ||
      this.state.services.loading ||
      this.state.teamServiceStates.loading ||
      this.state.scoreboard.loading
    )
  }

  isError () {
    return (
      this.state.teams.err ||
      this.state.services.err ||
      this.state.teamServiceStates.err ||
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
