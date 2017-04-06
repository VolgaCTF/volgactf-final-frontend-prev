import alt from '../utils/alt'
import ScoreboardActions from '../actions/scoreboard-actions'
import eventManager from '../utils/event-manager'
import ScoreboardModel from '../models/scoreboard-model'

class ScoreboardStore {
  constructor () {
    this.state = {
      loading: true,
      err: null,
      model: null
    }

    this.bindListeners({
      handleUpdate: ScoreboardActions.UPDATE,
      handleFetch: ScoreboardActions.FETCH,
      handleFailed: ScoreboardActions.FAILED
    })

    if (eventManager.enabled) {
      eventManager.eventSource.addEventListener('scoreboard', (e) => {
        let data = JSON.parse(e.data)
        ScoreboardActions.update(new ScoreboardModel(data))
      })
    }
  }

  handleUpdate (scoreboard) {
    this.setState({
      loading: false,
      err: null,
      model: scoreboard
    })
  }

  handleFetch () {
    this.setState({
      loading: true,
      err: null,
      model: null
    })
  }

  handleFailed (err) {
    this.setState({
      loading: false,
      err: err,
      model: null
    })
  }
}

export default alt.createStore(ScoreboardStore, 'ScoreboardStore')
