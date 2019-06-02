import React from 'react'
import ActionTrendingFlat from 'material-ui/svg-icons/action/trending-flat'
import ActionTrendingUp from 'material-ui/svg-icons/action/trending-up'
import ActionTrendingDown from 'material-ui/svg-icons/action/trending-down'

import { red600, green600, grey600 } from 'material-ui/styles/colors'

export default class ScoreTablePositionCellView extends React.Component {
  render () {
    let className = null
    switch (this.props.value) {
      case 1:
        className = 'volgactf-final-position volgactf-final-position-gold'
        break
      case 2:
        className = 'volgactf-final-position volgactf-final-position-silver'
        break
      case 3:
        className = 'volgactf-final-position volgactf-final-position-bronze'
        break
    }
    return (
      <td>
        <span className={className}>{this.props.value}</span>
        {
          (() => {
            const style = {
              opacity: this.props.muted ? 0.5 : 1,
              verticalAlign: 'bottom',
              marginLeft: '5px',
              cursor: 'pointer',
              display: 'inline-block'
            }
            if (this.props.trend < 0) {
              return <span style={style} title="Position is on the decrease"><ActionTrendingDown color={red600} /></span>
            } else if (this.props.trend > 0) {
              return <span style={style} title="Position is on the increase"><ActionTrendingUp color={green600} /></span>
            } else {
              return <span style={style} title="Position is unlikely to change"><ActionTrendingFlat color={grey600} /></span>
            }
          })()
        }
      </td>
    )
  }
}
