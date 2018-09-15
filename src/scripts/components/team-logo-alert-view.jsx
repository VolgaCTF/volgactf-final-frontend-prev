import React from 'react'

import Paper from 'material-ui/Paper'
import Spacing from 'material-ui/styles/spacing'
import Typography from 'material-ui/styles/typography'

import AlertWarning from 'material-ui/svg-icons/alert/warning'
import FlatButton from 'material-ui/FlatButton'

import { red50, red600 } from 'material-ui/styles/colors'

import UploadTeamLogoDialogView from './upload-team-logo-dialog-view'

export default class TeamLogoAlertView extends React.Component {
  constructor (props) {
    super(props)

    this.onUploadTeamLogoDialog = this.onUploadTeamLogoDialog.bind(this)
  }

  onUploadTeamLogoDialog () {
    this.refs.uploadTeamLogoDialog.start()
  }

  render () {
    const paperStyle = {
      paddingTop: '5px',
      paddingBottom: '15px'
    }
    const alertStyle = {
      minWidth: '150px',
      padding: '10px',
      border: '1px solid transparent',
      borderRadius: '3px',
      backgroundColor: red50,
      borderColor: red50,
      color: red600
    }
    const buttonStyle = {
      fontWeight: Typography.fontWeightBold,
      fontSize: '100%',
      textTransform: 'none',
      color: red600,
      textDecoration: 'underline'
    }
    return (
      <Paper zDepth={0} rounded={false} style={paperStyle}>
        <div style={alertStyle} role="alert">
          <AlertWarning color={red600} style={{verticalAlign: 'text-bottom'}}/>
          Your team does not have a logo
          <FlatButton label="Upload" primary={true} labelStyle={buttonStyle} onTouchTap={this.onUploadTeamLogoDialog} />
          <UploadTeamLogoDialogView ref='uploadTeamLogoDialog'/>
        </div>
      </Paper>
    )
  }
}
