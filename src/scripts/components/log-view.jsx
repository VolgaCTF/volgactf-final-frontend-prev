import React from 'react'
import { blue900, cyan900, purple900, red900, grey600, green700, red600, deepOrange500, brown600, brown900, teal900, green900, lightBlue900, pink900 } from 'material-ui/styles/colors'

import moment from 'moment'

export default class LogView extends React.Component {
  render () {
    let text = ''
    switch (this.props.type) {
      case 1:
        let status = null
        switch (this.props.params.value) {
          case 0:
            status = 'initial'
            break
          case 1:
            status = 'await_start'
            break
          case 2:
            status = 'running'
            break
          case 3:
            status = 'paused'
            break
          case 4:
            status = 'await_complete'
            break
          case 5:
            status = 'completed'
            break
          default:
            status = 'n/a'
            break
        }

        text = <span style={{color: blue900}}>Contest state changed to <code style={{color: cyan900}}>{status}</code></span>
        break
      case 2:
        text = <span style={{color: purple900}}>Round <code style={{color: red900}}>{this.props.params.value}</code> has started!</span>
        break
      case 3:
        let team = this.props.teams.find(x => x.id === this.props.params.team_id)
        let service = this.props.services.find(x => x.id === this.props.params.service_id)
        if (team != null && service != null) {
          let style = {
            color: grey600
          }

          let status = null

          switch (this.props.params.state) {
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

          text = <span style={{color: brown900}}>Team <code style={{color: teal900}}>{team.name}</code>, service <code style={{color: pink900}}>{service.name}</code> state is <code style={style}>{status}</code></span>
        }
        break
      case 4:
        let attackTeam = this.props.teams.find(x => x.id === this.props.params.attack_team_id)
        let victimTeam = this.props.teams.find(x => x.id === this.props.params.victim_team_id)
        let attackedService = this.props.services.find(x => x.id === this.props.params.service_id)
        if (attackTeam != null && victimTeam != null && attackedService != null) {
          text = <span style={{color: green900}}>Team <code style={{color: lightBlue900}}>{attackTeam.name}</code> has attacked team <code style={{color: lightBlue900}}>{victimTeam.name}</code>, service <code style={{color: pink900}}>{attackedService.name}</code>!</span>
        }
        break
      default:
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
