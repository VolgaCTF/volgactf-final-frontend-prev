import alt from '../utils/alt'
import CompetitionRoundActions from '../actions/competition-round-actions'
import eventManager from '../utils/event-manager'
import CompetitionRoundModel from '../models/competition-round-model'

class CompetitionRoundStore {
  constructor () {
    this.state = {
      loading: true,
      err: null,
      model: null
    }

    this.bindListeners({
      handleUpdate: CompetitionRoundActions.UPDATE,
      handleFetch: CompetitionRoundActions.FETCH,
      handleFailed: CompetitionRoundActions.FAILED
    })

    eventManager.on('competition/round', (e) => {
      let data = JSON.parse(e.data)
      CompetitionRoundActions.update(new CompetitionRoundModel(data))
    })
  }

  handleUpdate (competitionRound) {
    this.setState({
      loading: false,
      err: null,
      model: competitionRound
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

export default alt.createStore(CompetitionRoundStore, 'CompetitionRoundStore')
