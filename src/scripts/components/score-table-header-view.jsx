import React from 'react'
import IconButton from 'material-ui/IconButton'
import ActionInfo from 'material-ui/svg-icons/action/info'
import AlertWarning from 'material-ui/svg-icons/alert/warning'

import { lightBlue500, orange500 } from 'material-ui/styles/colors'

export default class ScoreTableHeaderView extends React.Component {
  render () {
    let cells = this.props.order.map((column, ndx) => {
      const header = this.props.headers[column]
      let style = {}
      if (typeof header.style != 'undefined' && header.style != null) {
        style = header.style
      }
      if (typeof header.service != undefined && header.service) {
        return (
          <th key={ndx} style={style}>
            {header.name}
            {
              (() => {
                if (header.meta.attackPriority) {
                  if (header.meta.awardDefenceAfter === null) {

                    return (
                      <span title="Defence points will be awarded after the first attack" style={{marginLeft: '5px', cursor: 'pointer'}}>
                        <ActionInfo color={lightBlue500} style={{width: '20px', height: '20px', verticalAlign: 'text-bottom'}} />
                      </span>
                    )
                  } else {
                    return <span></span>
                  }
                }
                return <span></span>
              })()
            }
            {
              (() => {
                if (header.meta.disableIn !== null) {
                  return (
                    <span title={`The service will be disabled after the end of round ${header.meta.disableIn}`} style={{marginLeft: '5px', cursor: 'pointer'}}>
                      <AlertWarning color={orange500} style={{width: '20px', height: '20px', verticalAlign: 'text-bottom'}} />
                    </span>
                  )
                } else {
                  return <span></span>
                }
              })()
            }
          </th>
        )
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
