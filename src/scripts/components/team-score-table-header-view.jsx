import React from 'react'

export default class TeamScoreTableHeaderView extends React.Component {
  render () {
    const cells = this.props.order.map((column, ndx) => {
      const header = this.props.headers[column]
      let style = {}
      if (typeof header.style != 'undefined' && header.style != null) {
        style = header.style
      }
      return (
        <th key={ndx} style={style}>
          {header.title}
        </th>
      )
    })

    return (
      <tr>
        {cells}
      </tr>
    )
  }
}
