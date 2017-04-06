import React from 'react'
import { green50, green700, red50, red600, deepOrange50, deepOrange500, brown50, brown600, grey100, grey600 } from 'material-ui/styles/colors'

export default class ScoreTableServiceStateCellView extends React.Component {
  render () {
    let style = {
      padding: '4px 8px',
      fontSize: '0.9em'
    }

    let text = null

    switch (this.props.value) {
      case 1:
        text = 'up'
        style.color = green700
        style.backgroundColor = green50
        break
      case 2:
        text = 'down'
        style.color = red600
        style.backgroundColor = red50
        break
      case 3:
        text = 'corrupt'
        style.color = deepOrange500
        style.backgroundColor = deepOrange50
        break
      case 4:
        text = 'mumble'
        style.color = brown600
        style.backgroundColor = brown50
        break
      case 5:
        text = 'internal_error'
        style.color = grey600
        style.backgroundColor = grey100
        break
      default:
        text = 'n/a'
        style.color = grey600
        style.backgroundColor = grey100
        break
    }

    return (
      <td>
        <span style={style}>{text}</span>
      </td>
    )
  }
}
