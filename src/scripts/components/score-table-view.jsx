import React from 'react'

import ScoreTableHeaderView from './score-table-header-view'
import ScoreTableRowView from './score-table-row-view'

export default class ScoreTableView extends React.Component {
  render () {
    let rows = this.props.table.rows.map((row, ndx) => {
      return (
        <ScoreTableRowView key={row.id} identity={this.props.identity} order={this.props.table.order} data={row} muted={this.props.table.muted} />
      )
    })

    return (
      <table className='themis-table'>
        <thead>
          <ScoreTableHeaderView order={this.props.table.order} headers={this.props.table.headers} />
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}
