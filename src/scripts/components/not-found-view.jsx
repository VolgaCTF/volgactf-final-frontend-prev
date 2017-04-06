import React from 'react'
import { withRouter } from 'react-router'
import DocumentTitle from 'react-document-title'
import Paper from 'material-ui/Paper'
import Spacing from 'material-ui/styles/spacing'

import Customize from '../../../customize'

class NotFoundView extends React.Component {
  constructor (props) {
    super(props)
    this.getOnNavigate = this.getOnNavigate.bind(this)
  }

  getOnNavigate (route) {
    return () => {
      this.props.router.push(route)
    }
  }

  render () {
    let style = {
      paddingTop: '15px',
      paddingBottom: '15px',
      paddingLeft: Spacing.desktopGutter,
      paddingRight: Spacing.desktopGutter
    }

    let listStyle = {
      listStyleType: 'none',
      paddingLeft: '0',
      lineHeight: '1.5em'
    }

    let links = [
      <li key={0}><a href='/' onTouchTap={this.getOnNavigate('/')}>Main page</a></li>,
      <li key={1}><a href='/scoreboard' onTouchTap={this.getOnNavigate('/scoreboard')}>Scoreboard</a></li>,
      <li key={2}><a href='/news' onTouchTap={this.getOnNavigate('/news')}>News</a></li>
    ]

    if (this.props.identity.isInternal()) {
      links.push(<li key={3}><a href='/logs' onTouchTap={this.getOnNavigate('/logs')}>Logs</a></li>)
    }

    let title = `${Customize.contestTitle} :: Not Found`

    return (
      <DocumentTitle title={title}>
        <Paper zDepth={0} style={style}>
          <h2>Not Found</h2>
          <p>This is not the page you are looking for...</p>
          <p>Try these:</p>
          <ul style={listStyle}>
            {links}
          </ul>
        </Paper>
      </DocumentTitle>
    )
  }
}

export default withRouter(NotFoundView)
