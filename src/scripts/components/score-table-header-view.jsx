import React from 'react'

export default class ScoreTableHeaderView extends React.Component {
  render () {
    let cells = this.props.order.map((column, ndx) => {
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
