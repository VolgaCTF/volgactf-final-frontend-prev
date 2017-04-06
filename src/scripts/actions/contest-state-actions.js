import 'whatwg-fetch'
// import { Promise } from 'es6-promise'

import alt from '../utils/alt'
import ContestStateModel from '../models/contest-state-model'

class ContestStateActions {
  static fetchPromise () {
    return new Promise((resolve, reject) => {
      fetch('/api/contest/state')
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
          resolve(new ContestStateModel(data))
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  update (contestState) {
    return contestState
  }

  fetch () {
    return (dispatch) => {
      dispatch()

      ContestStateActions
      .fetchPromise()
      .then((contestState) => {
        this.update(contestState)
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

export default alt.createActions(ContestStateActions)
