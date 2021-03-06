import React from 'react'
import DocumentTitle from 'react-document-title'

import Spacing from 'material-ui/styles/spacing'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

import PostListView from './post-list-view'
import NewsStore from '../stores/news-store'
import NewsActions from '../actions/news-actions'
import PostAddDialogView from './post-add-dialog-view'

import Customize from '../../../customize'

export default class NewsView extends React.Component {
  constructor (props) {
    super(props)
    this.state = NewsStore.getState()
    this.onUpdate = this.onUpdate.bind(this)
    this.onAddDialog = this.onAddDialog.bind(this)
  }

  componentDidMount () {
    NewsStore.listen(this.onUpdate)
    NewsActions.fetch()
  }

  componentWillUnmount () {
    NewsStore.unlisten(this.onUpdate)
  }

  onUpdate (state) {
    this.setState(state)
  }

  onAddDialog () {
    this.refs.addDialog.start()
  }

  render () {
    let style = {
      paddingTop: '15px',
      paddingBottom: '15px',
      paddingLeft: Spacing.desktopGutter,
      paddingRight: Spacing.desktopGutter
    }

    let controlAreaStyle = {
      marginBottom: '10px'
    }

    let controlArea = ''
    if (this.props.identity.isInternal()) {
      controlArea = (
        <div style={controlAreaStyle}>
          <RaisedButton label='Add' primary onTouchTap={this.onAddDialog} />
          <PostAddDialogView ref='addDialog' />
        </div>
      )
    }

    let title = `${Customize.competitionTitle} :: News`

    return (
      <DocumentTitle title={title}>
        <Paper zDepth={0} style={style}>
          <h2>News</h2>
          {controlArea}
          {
            (() => {
              if (this.state.loading) {
                return <p>Loading</p>
              }

              if (this.state.err) {
                return <p>Failed to fetch posts</p>
              }

              if (this.state.collection.isEmpty()) {
                return <p>No posts yet</p>
              } else {
                let sortedPosts = this.state.collection.sortBy(x => x.updatedAt.getTime()).reverse()
                return <PostListView posts={sortedPosts} identity={this.props.identity} />
              }
            })()
          }
        </Paper>
      </DocumentTitle>
    )
  }
}
