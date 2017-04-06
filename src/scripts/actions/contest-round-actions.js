import 'whatwg-fetch'
// import { Promise } from 'es6-promise'

import alt from '../utils/alt'
import ContestRoundModel from '../models/contest-round-model'

class ContestRoundActions {
  static fetchPromise () {
    return new Promise((resolve, reject) => {
      fetch('/api/contest/round')
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
        resolve(new ContestRoundModel(data))
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  update (contestRound) {
    return contestRound
  }

  fetch () {
    return (dispatch) => {
      dispatch()

      ContestRoundActions
      .fetchPromise()
      .then((contestRound) => {
        this.update(contestRound)
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

export default alt.createActions(ContestRoundActions)
