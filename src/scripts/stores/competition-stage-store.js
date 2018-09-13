import alt from '../utils/alt'
import CompetitionStageActions from '../actions/competition-stage-actions'
import eventManager from '../utils/event-manager'
import CompetitionStageModel from '../models/competition-stage-model'

class CompetitionStageStore {
  constructor () {
    this.state = {
      loading: true,
      err: null,
      model: null
    }

    this.bindListeners({
      handleUpdate: CompetitionStageActions.UPDATE,
      handleFetch: CompetitionStageActions.FETCH,
      handleFailed: CompetitionStageActions.FAILED
    })

    eventManager.on('competition/stage', (e) => {
      let data = JSON.parse(e.data)
      CompetitionStageActions.update(new CompetitionStageModel(data))
    })
  }

  handleUpdate (competitionStage) {
    this.setState({
      loading: false,
      err: null,
      model: competitionStage
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

export default alt.createStore(CompetitionStageStore, 'CompetitionStageStore')
