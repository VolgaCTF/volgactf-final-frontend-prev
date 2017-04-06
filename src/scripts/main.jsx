import 'array.prototype.find'
import 'array.prototype.findindex'

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './components/app'
import IndexView from './components/index-view'
import ScoreboardView from './components/scoreboard-view'
import NewsView from './components/news-view'
import LogsView from './components/logs-view'
import NotFoundView from './components/not-found-view'

import dataManager from './utils/data-manager'

function ready (callback) {
  if (document.readyState !== 'loading') {
    callback()
  } else {
    document.addEventListener('DOMContentLoaded', callback)
  }
}

function render (identity) {
  ReactDOM.render(
    <Router history={browserHistory}>
      <Route path='/' component={App} identity={identity}>
        <IndexRoute component={IndexView} />
        <Route path='scoreboard' component={ScoreboardView} />
        <Route path='news' component={NewsView} />
        <Route path='logs' component={identity.isInternal() ? LogsView : NotFoundView} />
        <Route path='*' component={NotFoundView} />
      </Route>
    </Router>,
    document.getElementById('app')
  )
}

ready(() => {
  dataManager
  .getIdentity()
  .then((identity) => {
    injectTapEventPlugin()
    render(identity)
  })
  .catch((err) => {
    console.log('Error', err)
  })
})
