import 'whatwg-fetch'
// import { Promise } from 'es6-promise'

import alt from '../utils/alt'
import CompetitionRoundModel from '../models/competition-round-model'

class CompetitionRoundActions {
  static fetchPromise () {
    return new Promise((resolve, reject) => {
      fetch('/api/competition/round')
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
        resolve(new CompetitionRoundModel(data))
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  update (competitionRound) {
    return competitionRound
  }

  fetch () {
    return (dispatch) => {
      dispatch()

      CompetitionRoundActions
      .fetchPromise()
      .then((competitionRound) => {
        this.update(competitionRound)
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

export default alt.createActions(CompetitionRoundActions)
