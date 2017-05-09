import eventManager from './event-manager'

import Customize from '../../../customize'
import PostModel from '../models/post-model'
import ContestStateModel from '../models/contest-state-model'

class NotificationManager {
  constructor () {
    if (this.enabled) {
      this.eventSource = new window.EventSource('/stream/')
    }

    this.notifyAddPost = this.notifyAddPost.bind(this)
    this.notifyUpdateContestState = this.notifyUpdateContestState.bind(this)
  }

  get enabled () {
    return window.EventSource != null
  }

  bind () {
    if ('Notification' in window) {
      if (window.Notification.permission === 'granted') {
      } else if (window.Notification.permission !== 'denied' || window.Notification.permission === 'default') {
        window.Notification.requestPermission((permission) => {
        })
      }
    }

    if (eventManager.enabled) {
      eventManager.eventSource.addEventListener('posts/add', this.notifyAddPost)
      eventManager.eventSource.addEventListener('contest/state', this.notifyUpdateContestState)
    }
  }

  unbind () {
    if (eventManager.enabled) {
      eventManager.eventSource.removeEventListener('posts/add', this.notifyAddPost)
      eventManager.eventSource.removeEventListener('contest/state', this.notifyUpdateContestState)
    }
  }

  presentNotification (title, options) {
    const notification = new Notification(title, options)
  }

  sendNotification (title, options) {
    if ('Notification' in window) {
      if (window.Notification.permission === 'granted') {
        this.presentNotification(title, options)
      } else if (window.Notification.permission !== 'denied' || window.Notification.permission === 'default') {
        window.Notification.requestPermission((permission) => {
          if (permission === 'granted') {
            this.presentNotification(title, options)
          }
        })
      }
    }
  }

  getDefaultOptions () {
    let options = {}
    if (Customize.contestNotifyLogo && Customize.contestNotifyLogo.dist) {
      options['icon'] = Customize.contestNotifyLogo.dist
    }
    return options
  }

  notifyAddPost (e) {
    const post = new PostModel(JSON.parse(e.data))
    let options = this.getDefaultOptions()
    options['body'] = post.title
    this.sendNotification('News update', options)
  }

  notifyUpdateContestState (e) {
    const contestState = new ContestStateModel(JSON.parse(e.data))
    let body = null
    switch (contestState.value) {
      case 1:
        body = 'Contest will start shortly...'
        break
      case 2:
        body = 'Contest has started!'
        break
      case 3:
        body = 'Contest has paused!'
        break
      case 4:
        body = 'Contest will finish in a couple of minutes...'
        break
      case 5:
        body = 'Contest has finished!'
        break
      default:
        body = null
        break
    }

    if (body !== null) {
      let options = this.getDefaultOptions()
      options['body'] = body
      this.sendNotification('Contest update', options)
    }
  }
}

export default new NotificationManager()
