import eventManager from './event-manager'

import Customize from '../../../customize'
import PostModel from '../models/post-model'
import CompetitionStageModel from '../models/competition-stage-model'

class NotificationManager {
  constructor () {
    this.notifyAddPost = this.notifyAddPost.bind(this)
    this.notifyUpdateCompetitionStage = this.notifyUpdateCompetitionStage.bind(this)
  }

  bind () {
    if ('Notification' in window) {
      if (window.Notification.permission === 'granted') {
      } else if (window.Notification.permission !== 'denied' || window.Notification.permission === 'default') {
        window.Notification.requestPermission((permission) => {
        })
      }
    }

    eventManager.on('posts/add', this.notifyAddPost)
    eventManager.on('competition/stage', this.notifyUpdateCompetitionStage)
  }

  unbind () {
    eventManager.off('posts/add', this.notifyAddPost)
    eventManager.off('competition/stage', this.notifyUpdateCompetitionStage)
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
    if (Customize.competitionNotifyLogo && Customize.competitionNotifyLogo.dist) {
      options['icon'] = Customize.competitionNotifyLogo.dist
    }
    return options
  }

  notifyAddPost (e) {
    const post = new PostModel(JSON.parse(e.data))
    let options = this.getDefaultOptions()
    options['body'] = post.title
    this.sendNotification('News update', options)
  }

  notifyUpdateCompetitionStage (e) {
    const competitionStage = new CompetitionStageModel(JSON.parse(e.data))
    let body = null
    switch (competitionStage.value) {
      case 1:
        body = 'Competition will start soon...'
        break
      case 2:
        body = 'Competition has started!'
        break
      case 3:
        body = 'Competition will pause soon...'
        break
      case 4:
        body = 'Competition is paused!'
        break
      case 5:
        body = 'Competition will finish soon...'
        break
      case 6:
        body = 'Competition has finished!'
        break
      default:
        body = null
        break
    }

    if (body !== null) {
      let options = this.getDefaultOptions()
      options['body'] = body
      this.sendNotification('Competition update', options)
    }
  }
}

export default new NotificationManager()
