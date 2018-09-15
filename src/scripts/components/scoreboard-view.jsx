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

import CompetitionRoundStore from '../stores/competition-round-store'
import CompetitionRoundActions from '../actions/competition-round-actions'

import CompetitionStageStore from '../stores/competition-stage-store'
import CompetitionStageActions from '../actions/competition-stage-actions'

import TeamLogoAlertView from './team-logo-alert-view'

import Customize from '../../../customize'

export default class ScoreboardView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      teams: TeamStore.getState(),
      services: ServiceStore.getState(),
      teamServicePushStates: TeamServicePushStateStore.getState(),
      teamServicePullStates: TeamServicePullStateStore.getState(),
      scoreboard: ScoreboardStore.getState(),
      round: CompetitionRoundStore.getState(),
      stage: CompetitionStageStore.getState()
    }

    this.onUpdateTeams = this.onUpdateTeams.bind(this)
    this.onUpdateServices = this.onUpdateServices.bind(this)
    this.onUpdateTeamServicePushStates = this.onUpdateTeamServicePushStates.bind(this)
    this.onUpdateTeamServicePullStates = this.onUpdateTeamServicePullStates.bind(this)
    this.onUpdateScoreboard = this.onUpdateScoreboard.bind(this)
    this.onUpdateRound = this.onUpdateRound.bind(this)
    this.onUpdateStage = this.onUpdateStage.bind(this)
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

  onUpdateRound (round) {
    this.setState({
      round: round
    })
  }

  onUpdateStage (stage) {
    this.setState({
      stage: stage
    })
  }

  calculateTable () {
    let order = [
      'rank',
      'team',
      'totalPoints',
      'attackPoints',
      'availabilityPoints',
      'defencePoints'
    ]

    let headers = {
      rank: {
        title: 'Rank'
      },
      team: {
        title: 'Team',
        team: true
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

    const competitionStage = this.state.stage.model
    const competitionRound = this.state.round.model

    for (const service of this.state.services.collection) {
      const serviceId = `#service_${service.id}`
      headers[serviceId] = {
        service: true,
        name: service.name,
        style: {
          textAlign: 'center'
        },
        meta: {
          attackPriority: service.attackPriority,
          awardDefenceAfter: service.awardDefenceAfter,
          enableIn: service.enableIn,
          disableIn: service.disableIn
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
        totalPoints: position.totalPoints,
        attackPoints: position.attackPoints,
        availabilityPoints: position.availabilityPoints,
        defencePoints: position.defencePoints,
        lastAttack: position.lastAttack,
        guest: team.guest,
        logoHash: team.logoHash
      }

      for (let service of this.state.services.collection) {
        const serviceId = `#service_${service.id}`
        const teamServicePushState = this.state.teamServicePushStates.collection.find((state) => {
          return state.teamId === team.id && state.serviceId === service.id
        })
        const teamServicePullState = this.state.teamServicePullStates.collection.find((state) => {
          return state.teamId === team.id && state.serviceId === service.id
        })

        const pushEnabled = competitionStage.isStarted() && ((service.disableIn === null) ? true : competitionRound.value <= service.disableIn)
        const pullEnabled = competitionStage.isStarted() || competitionStage.isPausing() || competitionStage.isFinishing()

        row[serviceId] = {
          push: {
            value: teamServicePushState ? teamServicePushState.state : 0,
            updated: teamServicePushState ? teamServicePushState.updatedAt : null,
            message: teamServicePushState ? teamServicePushState.message : null,
            dim: !pushEnabled
          },
          pull: {
            value: teamServicePullState ? teamServicePullState.state : 0,
            updated: teamServicePullState ? teamServicePullState.updatedAt : null,
            message: teamServicePullState ? teamServicePullState.message : null,
            dim: !pullEnabled
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
    CompetitionRoundStore.listen(this.onUpdateRound)
    CompetitionStageStore.listen(this.onUpdateStage)

    TeamActions.fetch()
    ServiceActions.fetch()
    TeamServicePushStateActions.fetch()
    TeamServicePullStateActions.fetch()
    ScoreboardActions.fetch()
    CompetitionRoundActions.fetch()
    CompetitionStageActions.fetch()
  }

  componentWillUnmount () {
    TeamStore.unlisten(this.onUpdateTeams)
    ServiceStore.unlisten(this.onUpdateServices)
    TeamServicePushStateStore.unlisten(this.onUpdateTeamServicePushStates)
    TeamServicePullStateStore.unlisten(this.onUpdateTeamServicePullStates)
    ScoreboardStore.unlisten(this.onUpdateScoreboard)
    CompetitionRoundStore.unlisten(this.onUpdateRound)
    CompetitionStageStore.unlisten(this.onUpdateStage)
  }

  isLoading () {
    return (
      this.state.teams.loading ||
      this.state.services.loading ||
      this.state.teamServicePushStates.loading ||
      this.state.teamServicePullStates.loading ||
      this.state.scoreboard.loading ||
      this.state.round.loading ||
      this.state.stage.loading
    )
  }

  isError () {
    return (
      this.state.teams.err ||
      this.state.services.err ||
      this.state.teamServicePushStates.err ||
      this.state.teamServicePullStates.err ||
      this.state.scoreboard.err ||
      this.state.round.err ||
      this.state.stage.err
    )
  }

  render () {
    let style = {
      paddingTop: '15px',
      paddingBottom: '15px',
      paddingLeft: Spacing.desktopGutter,
      paddingRight: Spacing.desktopGutter
    }

    let title = `${Customize.competitionTitle} :: Scoreboard`

    return (
      <DocumentTitle title={title}>
        <Paper zDepth={0} style={style}>
          <h2>Scoreboard</h2>
          {
            (() => {
              if (this.isLoading()) {
                return null
              }

              if (this.isError()) {
                return null
              }

              if (!this.props.identity.isTeam()) {
                return null
              }

              const team = this.state.teams.collection.find((team) => {
                return this.props.identity.getId() === team.id
              })

              if (team.logoHash) {
                return null
              } else {
                return <TeamLogoAlertView/>
              }
            })()
          }
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
