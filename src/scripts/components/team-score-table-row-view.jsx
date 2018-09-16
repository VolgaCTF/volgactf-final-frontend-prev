import React from 'react'

import TeamScoreTableScoreCellView from './team-score-table-score-cell-view'

export default class TeamScoreTableRowView extends React.Component {
  render () {
    const cells = this.props.order.map((column, ndx) => {
      const value = this.props.data[column]
      if (['totalPoints', 'attackPoints', 'availabilityPoints', 'defencePoints'].indexOf(column) !== -1) {
        return <TeamScoreTableScoreCellView key={ndx} value={value} />
      }
      return (
        <td key={ndx}>
          {value}
        </td>
      )
    })

    return (
      <tr>
        {cells}
      </tr>
    )
  }
}
