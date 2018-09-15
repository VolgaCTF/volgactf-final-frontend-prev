import React from 'react'
import ReactDOM from 'react-dom'
import 'whatwg-fetch'

import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import { red600 } from 'material-ui/styles/colors'

import TextField from 'material-ui/TextField'

export default class UploadTeamLogoDialogView extends React.Component {
  constructor (props) {
    super(props)

    this.onUpload = this.onUpload.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onChoose = this.onChoose.bind(this)
    this.onChange = this.onChange.bind(this)

    this.state = {
      open: false,
      error: null,
      filename: ''
    }
  }

  onCancel () {
    this.dismiss()
  }

  simulateClick(elem) {
    const evt = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    })
    const canceled = !elem.dispatchEvent(evt)
  }

  onChoose () {
    const fileInput = ReactDOM.findDOMNode(this.refs.fileInput)
    this.simulateClick(fileInput)
  }

  onChange () {
    const fileInput = ReactDOM.findDOMNode(this.refs.fileInput)
    let fieldVal = ''
    if (fileInput.files.length > 0 && fileInput.files[0].name) {
      fieldVal = fileInput.files[0].name
    }
    fieldVal = fieldVal.replace('C:\\fakepath\\', '')

    if (typeof fieldVal !== 'undefined' || fieldVal !== '') {
      this.setState({
        filename: fieldVal,
        error: null
      })
    } else {
      this.setState({
        filename: '',
        error: null
      })
    }
  }

  onUpload () {
    const fileInput = ReactDOM.findDOMNode(this.refs.fileInput)
    if (fileInput.files.length === 0) {
      this.setState({
        error: 'No file chosen'
      })
      return
    }

    const formData = new FormData()
    formData.append('file', fileInput.files[0])
    let savedResponse = null
    fetch('/api/team/logo', {
      method: 'POST',
      body: formData
    })
    .then((response) => {
      savedResponse = response
      return response.text()
    })
    .then((text) => {
      if (savedResponse.status >= 200 && savedResponse.status < 300) {
        return ''
      } else if (savedResponse.status === 400) {
        const err = new Error(savedResponse.statusText)
        err.message = text
        throw err
      } else if (savedResponse.status === 413) {
        const err = new Error(savedResponse.statusText)
        err.message = 'Image size must not exceed 1 Mb'
        throw err
      } else {
        const err = new Error(savedResponse.statusText)
        err.message = savedResponse.statusText
        throw err
      }
    })
    .then(() => {
      this.dismiss()
    })
    .catch((err) => {
      this.setState({
        error: err.message
      })
    })
  }

  start () {
    this.setState({
      open: true,
      error: null,
      filename: ''
    })
  }

  dismiss () {
    this.setState({
      open: false,
      error: null,
      filename: ''
    })
  }

  render () {
    let actions = [
      <FlatButton key={1} label='Cancel' secondary onTouchTap={this.onCancel} />,
      <FlatButton key={2} label='Upload' primary onTouchTap={this.onUpload} />
    ]

    return (
      <Dialog title='Upload a logo' actions={actions} open={this.state.open}>
        <input type="file" accept="image/jpeg,image/png,image/gif" ref="fileInput" onChange={this.onChange} style={{display: 'none'}}/>
        <TextField disabled={true} hintText="Choose a file" value={this.state.filename}/>
        &nbsp;
        <FlatButton label='Browse' primary onTouchTap={this.onChoose}/>
        {
          (() => {
            if (this.state.error) {
              return <p style={{color: red600}}>{this.state.error}</p>
            }
            return null
          })()
        }
      </Dialog>
    )
  }
}
