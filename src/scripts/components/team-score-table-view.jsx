import React from 'react'

import TeamScoreTableHeaderView from './team-score-table-header-view'
import TeamScoreTableRowView from './team-score-table-row-view'

export default class TeamScoreTableView extends React.Component {
  render () {
    const rows = this.props.table.rows.map((row, ndx) => {
      return (
        <TeamScoreTableRowView key={row.id} identity={this.props.identity} order={this.props.table.order} data={row} />
      )
    })

    return (
      <table className='volgactf-final-table'>
        <thead>
          <TeamScoreTableHeaderView order={this.props.table.order} headers={this.props.table.headers} />
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}
