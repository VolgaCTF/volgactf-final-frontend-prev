import React from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Card, { CardTitle, CardText } from 'material-ui/Card'

import NewsActions from '../actions/news-actions'
import MarkdownRenderer from '../utils/markdown'

export default class PostEditDialogView extends React.Component {
  constructor (props) {
    super(props)

    this.onOK = this.onOK.bind(this)
    this.onCancel = this.onCancel.bind(this)

    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)

    this.state = {
      title: this.props.title,
      description: this.props.description,
      open: false
    }
  }

  onCancel () {
    this.dismiss()
  }

  onOK () {
    NewsActions.edit(this.props.id, this.state.title, this.state.description)
    this.dismiss()
  }

  onChangeTitle (event) {
    this.setState({
      title: event.target.value
    })
  }

  onChangeDescription (event) {
    this.setState({
      description: event.target.value
    })
  }

  start () {
    this.setState({
      title: this.props.title,
      description: this.props.description,
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
      <FlatButton key={1} label='Cancel' secondary onTouchTap={this.onCancel} />,
      <FlatButton key={2} label='Update' primary onTouchTap={this.onOK} />
    ]

    let descriptionFieldStyle = {
      minHeight: '100px'
    }

    let md = new MarkdownRenderer()

    let containerStyle = {
      display: 'flex'
    }

    let formStyle = {
      width: '50%',
      paddingRight: '10px'
    }

    let previewStyle = {
      width: '50%'
    }

    return (
      <Dialog title='Edit post' actions={actions} open={this.state.open}>
        <div style={containerStyle}>
          <div style={formStyle}>
            <TextField fullWidth autoFocus hintText='post title' value={this.state.title} onChange={this.onChangeTitle} />
            <TextField style={descriptionFieldStyle} fullWidth hintText='post description' multiLine value={this.state.description} onChange={this.onChangeDescription} />
          </div>
          <Card style={previewStyle}>
            <CardTitle title={this.state.title} />
            <CardText className='themis-post' dangerouslySetInnerHTML={{__html: md.render(this.state.description)}} />
          </Card>
        </div>
      </Dialog>
    )
  }
}
