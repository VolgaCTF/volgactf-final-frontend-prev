import React from 'react'
import numeral from 'numeral'

export default class ScoreTableScoreCellView extends React.Component {
  render () {
    return (
      <td className={this.props.muted ? 'themis-text-muted' : 'themis-text-normal'}>
        <span>{numeral(this.props.value).format('0.00')}</span>
      </td>
    )
  }
}
