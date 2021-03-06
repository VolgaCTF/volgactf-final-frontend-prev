import React from 'react'
import numeral from 'numeral'
import moment from 'moment'

export default class ScoreTableTotalScoreCellView extends React.Component {
  render () {
    let extras = ''
    if (this.props.lastAttack != null) {
      extras = [
        <br key={0} />,
        <span key={1} className='volgactf-final-score-last-attack'>last attack at {moment(this.props.lastAttack).format('HH:mm:ss')}</span>
      ]
    }
    return (
      <td className={this.props.muted ? 'volgactf-final-text-muted' : 'volgactf-final-text-normal'}>
        <span>{numeral(this.props.value).format('0.00')}</span>
        {extras}
      </td>
    )
  }
}
