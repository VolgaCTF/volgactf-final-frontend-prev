import React from 'react'
import { blue900, cyan900, purple900, red900, grey600, green700, red600, deepOrange500, brown600, brown900, teal900, green900, lightBlue900, pink900 } from 'material-ui/styles/colors'

import moment from 'moment'

export default class LogView extends React.Component {
  renderDefault (params) {
    return <span style={{color: grey600}}>{JSON.stringify(params)}</span>
  }

  renderCompetitionStageUpdate (stage) {
    let status = null
    switch (stage) {
      case 0:
        status = 'initial'
        break
      case 1:
        status = 'starting'
        break
      case 2:
        status = 'started'
        break
      case 3:
        status = 'pausing'
        break
      case 4:
        status = 'paused'
        break
      case 5:
        status = 'finishing'
        break
      case 6:
        status = 'finished'
        break
      default:
        status = 'n/a'
        break
    }

    return <span style={{color: blue900}}>Competition stage changed to <code style={{color: cyan900}}>{status}</code></span>
  }

  renderRoundUpdate (round) {
    return <span style={{color: purple900}}>Round <code style={{color: red900}}>{round}</code> has started!</span>
  }

  renderAttack (params) {
    const actorTeam = this.props.teams.find(x => x.id === params.actor_team_id)
    const targetTeam = this.props.teams.find(x => x.id === params.target_team_id)
    const targetService = this.props.services.find(x => x.id === params.target_service_id)
    if (actorTeam != null && targetTeam != null && targetService != null) {
      return <span style={{color: green900}}>Team <code style={{color: lightBlue900}}>{actorTeam.name}</code> has attacked team <code style={{color: lightBlue900}}>{targetTeam.name}</code>, service <code style={{color: pink900}}>{targetService.name}</code>!</span>
    }
    return this.renderDefault(params)
  }

  renderTeamServicePushStateUpdate (params) {
    let team = this.props.teams.find(x => x.id === params.team_id)
    let service = this.props.services.find(x => x.id === params.service_id)
    if (team != null && service != null) {
      const style = {
        color: grey600
      }

      let status = null

      switch (params.state) {
        case 1:
          status = 'up'
          style.color = green700
          break
        case 2:
          status = 'down'
          style.color = red600
          break
        case 3:
          status = 'corrupt'
          style.color = deepOrange500
          break
        case 4:
          status = 'mumble'
          style.color = brown600
          break
        case 5:
          status = 'internal_error'
          style.color = grey600
          break
        default:
          status = 'n/a'
          style.color = grey600
          break
      }
      return <span style={{color: brown900}}>Team <code style={{color: teal900}}>{team.name}</code>, service <code style={{color: pink900}}>{service.name}</code> push state is <code style={style}>{status}</code></span>
    }
    return this.renderDefault(params)
  }

  renderTeamServicePullStateUpdate (params) {
    const team = this.props.teams.find(x => x.id === params.team_id)
    const service = this.props.services.find(x => x.id === params.service_id)
    if (team != null && service != null) {
      const style = {
        color: grey600
      }

      let status = null

      switch (params.state) {
        case 1:
          status = 'up'
          style.color = green700
          break
        case 2:
          status = 'down'
          style.color = red600
          break
        case 3:
          status = 'corrupt'
          style.color = deepOrange500
          break
        case 4:
          status = 'mumble'
          style.color = brown600
          break
        case 5:
          status = 'internal_error'
          style.color = grey600
          break
        default:
          status = 'n/a'
          style.color = grey600
          break
      }
      return <span style={{color: brown900}}>Team <code style={{color: teal900}}>{team.name}</code>, service <code style={{color: pink900}}>{service.name}</code> pull state is <code style={style}>{status}</code></span>
    }
    return this.renderDefault(params)
  }

  renderServiceEnable (params) {
    return <span>Service <code>{params.service_name}</code> is enabled</span>
  }

  renderServiceDisable (params) {
    return <span>Service <code>{params.service_name}</code> is disabled</span>
  }

  renderServiceModifyEnableIn(params) {
    return <span>Service <code>{params.service_name}</code> is set to be enabled in round {params.service_enable_in}</span>
  }

  renderServiceModifyDisableIn(params) {
    return <span>Service <code>{params.service_name}</code> is set to be disabled in round {params.service_disable_in}</span>
  }

  renderServiceModifyAwardDefenceAfter(params) {
    return <span>Service <code>{params.service_name}</code> &ndash; defence points are to be awarded after round {params.service_award_defence_after} ends</span>
  }

  render () {
    let text = ''
    switch (this.props.type) {
      case 1:
        text = this.renderCompetitionStageUpdate(this.props.params.value)
        break
      case 2:
        text = this.renderRoundUpdate(this.props.params.value)
        break
      case 31:
        text = this.renderTeamServicePushStateUpdate(this.props.params)
        break
      case 32:
        text = this.renderTeamServicePullStateUpdate(this.props.params)
        break
      case 4:
        text = this.renderAttack(this.props.params)
        break
      case 41:
        text = this.renderServiceEnable(this.props.params)
        break
      case 42:
        text = this.renderServiceDisable(this.props.params)
        break
      case 43:
        text = this.renderServiceModifyEnableIn(this.props.params)
        break
      case 44:
        text = this.renderServiceModifyDisableIn(this.props.params)
        break
      case 45:
        text = this.renderServiceModifyAwardDefenceAfter(this.props.params)
        break
      default:
        text = this.renderDefault(this.props.params)
        break
    }

    return (
      <div>
        <code>{moment(this.props.updatedAt).format('HH:mm:ss.SSS')}</code>
        &nbsp;&nbsp;
        {text}
      </div>
    )
  }
}
