import React from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import NewsActions from '../actions/news-actions'

export default class PostRemoveDialogView extends React.Component {
  constructor (props) {
    super(props)

    this.onOK = this.onOK.bind(this)
    this.onCancel = this.onCancel.bind(this)

    this.state = {
      open: false
    }
  }

  onCancel () {
    this.dismiss()
  }

  onOK () {
    NewsActions.remove(this.props.id)
    this.dismiss()
  }

  start () {
    this.setState({
      open: true
    })
  }

  dismiss () {
    this.setState({
      open: false
    })
  }

  render () {
    let actions = [
      <FlatButton key={1} label='No' secondary onTouchTap={this.onCancel} />,
      <FlatButton key={2} label='Yes' primary onTouchTap={this.onOK} />
    ]

    return (
      <Dialog title='Remove post' actions={actions} open={this.state.open}>
        <p>Do you really want to remove post <i>{this.props.title}</i>?</p>
      </Dialog>
    )
  }
}
