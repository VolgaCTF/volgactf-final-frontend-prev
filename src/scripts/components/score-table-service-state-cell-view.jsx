import React from 'react'
import { green50, green700, red50, red600, deepOrange50, deepOrange500, brown50, brown600, grey100, grey600 } from 'material-ui/styles/colors'
import moment from 'moment'

export default class ScoreTableServiceStateCellView extends React.Component {
  getStateDescription (status) {
    switch (status) {
      case 1:
        return 'up'
      case 2:
        return 'down'
      case 3:
        return 'corrupt'
      case 4:
        return 'mumble'
      case 5:
        return 'internal_error'
      default:
        return 'n/a'
    }
  }

  getStateStyle (data) {
    let style = {
      width: '50%',
      padding: '1px',
      fontSize: '0.7em',
      textAlign: 'center',
      fontWeight: 'bold',
      fontVariant: 'small-caps',
      opacity: data.dim ? 0.5 : 1
    }

    switch (data.value) {
      case 1:
        style.color = green700
        style.backgroundColor = green50
        break
      case 2:
        style.color = red600
        style.backgroundColor = red50
        break
      case 3:
        style.color = deepOrange500
        style.backgroundColor = deepOrange50
        break
      case 4:
        style.color = brown600
        style.backgroundColor = brown50
        break
      case 5:
        style.color = grey600
        style.backgroundColor = grey100
        break
      default:
        style.color = grey600
        style.backgroundColor = grey100
        break
    }

    return style
  }

  getLabelStyle (data) {
    let style = {
      width: '50%',
      padding: '1px',
      fontSize: '0.6em',
      textAlign: 'center',
      fontWeight: 'bold',
      fontVariant: 'small-caps',
      opacity: data.dim ? 0.5 : 1
    }

    switch (data.value) {
      case 1:
        style.color = green700
        style.backgroundColor = green50
        break
      case 2:
        style.color = red600
        style.backgroundColor = red50
        break
      case 3:
        style.color = deepOrange500
        style.backgroundColor = deepOrange50
        break
      case 4:
        style.color = brown600
        style.backgroundColor = brown50
        break
      case 5:
        style.color = grey600
        style.backgroundColor = grey100
        break
      default:
        style.color = grey600
        style.backgroundColor = grey100
        break
    }

    return style
  }

  getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  render () {
    const pushValue = this.props.value.push.value
    const pullValue = this.props.value.pull.value

    let pushUpdated = this.props.value.push.updated ? `Updated at ${moment(this.props.value.push.updated).format('HH:mm:ss')}` : 'Updated: never'
    let pullUpdated = this.props.value.pull.updated ? `Updated at ${moment(this.props.value.pull.updated).format('HH:mm:ss')}` : 'Updated: never'

    const pushDim = this.props.value.push.dim
    const pullDim = this.props.value

    if (this.props.value.push.message) {
      pushUpdated += `\nMessage from the service checker:\n${this.props.value.push.message}`
    }

    if (this.props.value.pull.message) {
      pullUpdated += `\nMessage from the service checker:\n${this.props.value.pull.message}`
    }

    return (
      <td>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '4px 0' }}>
          <thead>
            <tr>
              <td style={this.getLabelStyle(this.props.value.push)} title={pushUpdated}>
                {`push${this.props.value.push.updated ? moment(this.props.value.push.updated).format(' HH:mm:ss') : ''}`}
              </td>
              <td style={this.getLabelStyle(this.props.value.pull)} title={pullUpdated}>
                {`pull${this.props.value.pull.updated ? moment(this.props.value.pull.updated).format(' HH:mm:ss') : ''}`}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={this.getStateStyle(this.props.value.push)} title={pushUpdated}>
                {this.getStateDescription(pushValue)}
              </td>
              <td style={this.getStateStyle(this.props.value.pull)} title={pullUpdated}>
                {this.getStateDescription(pullValue)}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    )
  }
}
