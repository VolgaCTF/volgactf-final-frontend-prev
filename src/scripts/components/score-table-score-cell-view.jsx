import React from 'react'
import numeral from 'numeral'

export default class ScoreTableScoreCellView extends React.Component {
  render () {
    return (
      <td className={this.props.muted ? 'volgactf-final-text-muted' : 'volgactf-final-text-normal'}>
        <span>{numeral(this.props.value).format('0.00')}</span>
      </td>
    )
  }
}
