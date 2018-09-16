import React from 'react'
import numeral from 'numeral'

export default class TeamScoreTableScoreCellView extends React.Component {
  render () {
    return (
      <td className="themis-text-normal">
        <span>{numeral(this.props.value).format('0.00')}</span>
      </td>
    )
  }
}
