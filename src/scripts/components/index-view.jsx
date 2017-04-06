import React from 'react'
import DocumentTitle from 'react-document-title'
import Paper from 'material-ui/Paper'
import Spacing from 'material-ui/styles/spacing'
import Customize from '../../../customize'
import MarkdownRenderer from '../utils/markdown'

export default class IndexView extends React.Component {
  render () {
    let style = {
      paddingTop: '15px',
      paddingBottom: '15px',
      paddingLeft: Spacing.desktopGutter,
      paddingRight: Spacing.desktopGutter
    }

    let title = `${Customize.contestTitle} :: Main`
    let md = new MarkdownRenderer()
    let divStyle = {
      lineHeight: '2em'
    }

    return (
      <DocumentTitle title={title}>
        <Paper zDepth={0} style={style}>
          <h2>{Customize.indexTitle}</h2>
          <div style={divStyle} dangerouslySetInnerHTML={{__html: md.render(Customize.indexDescription)}}></div>
        </Paper>
      </DocumentTitle>
    )
  }
}
