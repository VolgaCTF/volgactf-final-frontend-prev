import React from 'react'
import { withRouter } from 'react-router'

import UploadTeamLogoDialogView from './upload-team-logo-dialog-view'
import SocialPoll from 'material-ui/svg-icons/social/poll'

class ScoreTableTeamCellView extends React.Component {
  constructor (props) {
    super(props)
    this.onChangeTeamLogoDialog = this.onChangeTeamLogoDialog.bind(this)
    this.onOpenTeamStats = this.onOpenTeamStats.bind(this)
  }

  onChangeTeamLogoDialog () {
    this.refs.changeTeamLogoDialog.start()
  }

  onOpenTeamStats (e) {
    this.props.router.push(`/team/${this.props.teamId}/stats`)
  }

  render () {
    let className = 'volgactf-final-team'
    const exactTeam = this.props.identity.isTeam() && this.props.identity.getId() === this.props.teamId

    if (exactTeam) {
      className = `${className} volgactf-final-team-marked`
    }

    let extras = ''
    if (this.props.guest) {
      extras = [
        <span key={0}>&nbsp;&nbsp;</span>,
        <span key={1} className='volgactf-final-team-guest'>guest</span>
      ]
    }

    let logoSrc = `/api/team/logo/${this.props.teamId}.png`
    if (this.props.teamLogoHash) {
      logoSrc += `?${this.props.teamLogoHash}`
    }

    return (
      <td>
        {
          (() => {
            if (exactTeam && this.props.teamLogoHash) {
              return <UploadTeamLogoDialogView ref='changeTeamLogoDialog'/>
            }
            return null
          })()
        }
        {
          (() => {
            if (exactTeam  && this.props.teamLogoHash) {
              return <img className='volgactf-final-team-logo' style={{cursor: 'pointer'}} src={logoSrc} onTouchTap={this.onChangeTeamLogoDialog} />
            } else {
              return <img className='volgactf-final-team-logo' src={logoSrc} />
            }
          })()
        }

        &nbsp;
        <span className={className}>{this.props.value}</span>
        {extras}
        {
          (() => {
            if (this.props.identity.isInternal()) {
              const iconStyle = {
                verticalAlign: 'middle',
                marginLeft: '5px',
                cursor: 'pointer'
              }
              return <SocialPoll style={iconStyle} onTouchTap={this.onOpenTeamStats} />
            }
            return null
          })()
        }
      </td>
    )
  }
}

export default withRouter(ScoreTableTeamCellView)
