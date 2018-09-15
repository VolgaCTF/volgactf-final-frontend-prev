import React from 'react'
import UploadTeamLogoDialogView from './upload-team-logo-dialog-view'

export default class ScoreTableTeamCellView extends React.Component {
  constructor (props) {
    super(props)

    this.onChangeTeamLogoDialog = this.onChangeTeamLogoDialog.bind(this)
  }

  onChangeTeamLogoDialog () {
    this.refs.changeTeamLogoDialog.start()
  }

  render () {
    let className = 'themis-team-other'
    if (this.props.marked) {
      className = 'themis-team-marked'
    }

    let extras = ''
    if (this.props.guest) {
      extras = [
        <span key={0}>&nbsp;&nbsp;</span>,
        <span key={1} className='themis-team-guest'>guest</span>
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
            if (this.props.marked && this.props.teamLogoHash) {
              return <UploadTeamLogoDialogView ref='changeTeamLogoDialog'/>
            }
            return null
          })()
        }
        {
          (() => {
            if (this.props.marked && this.props.teamLogoHash) {
              return <img className='themis-team-logo' style={{cursor: 'pointer'}} src={logoSrc} onTouchTap={this.onChangeTeamLogoDialog} />
            } else {
              return <img className='themis-team-logo' src={logoSrc} />
            }
          })()
        }

        &nbsp;
        <span className={className}>{this.props.value}</span>
        {extras}
      </td>
    )
  }
}
