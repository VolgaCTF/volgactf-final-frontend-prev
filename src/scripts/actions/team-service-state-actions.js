import 'whatwg-fetch'
// import { Promise } from 'es6-promise'

import alt from '../utils/alt'
import TeamServiceStateModel from '../models/team-service-state-model'
import { List } from 'immutable'

class TeamServiceStateActions {
  static fetchPromise () {
    return new Promise((resolve, reject) => {
      fetch('/api/team/services')
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json()
        } else {
          let err = new Error(response.statusText)
          err.response = response
          throw err
        }
      })
      .then((data) => {
        let teamServiceStates = data.map((props) => {
          return new TeamServiceStateModel(props)
        })
        resolve(new List(teamServiceStates))
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  update (teamServiceStates) {
    return teamServiceStates
  }

  updateSingle (teamServiceState) {
    return teamServiceState
  }

  fetch () {
    return (dispatch) => {
      dispatch()

      TeamServiceStateActions
      .fetchPromise()
      .then((teamServiceStates) => {
        this.update(teamServiceStates)
      })
      .catch((err) => {
        this.failed(err)
      })
    }
  }

  failed (err) {
    return err
  }
}

export default alt.createActions(TeamServiceStateActions)
