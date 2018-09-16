import alt from '../utils/alt'
import TeamScoreActions from '../actions/team-score-actions'
import { List } from 'immutable'
import eventManager from '../utils/event-manager'
import TeamScoreModel from '../models/team-score-model'

class TeamScoreStore {
  constructor (teamId) {
    this.state = {
      loading: true,
      err: null,
      filter: teamId,
      collection: new List()
    }

    this.bindListeners({
      handleUpdate: TeamScoreActions.UPDATE,
      handleFetch: TeamScoreActions.FETCH,
      handleFailed: TeamScoreActions.FAILED,
      handleOnAdd: TeamScoreActions.ON_ADD
    })

    // eventManager.on('team/service/pull-state', (e) => {
    //   let data = JSON.parse(e.data)
    //   TeamServicePullStateActions.updateSingle(new TeamServicePullStateModel(data))
    // })
  }

  handleUpdate (teamScores) {
    this.setState({
      loading: false,
      err: null,
      collection: teamScores
    })
  }

  handleOnAdd (teamScore) {
    this.setState({
      loading: false,
      err: null,
      collection: this.state.collection.push(teamScore)
    })
  }

  handleFetch () {
    this.setState({
      loading: true,
      err: null,
      collection: new List()
    })
  }

  handleFailed (err) {
    this.setState({
      loading: false,
      err: err,
      collection: new List()
    })
  }
}

let storeCache = {}

export default function createTeamScoreStore (teamId) {
  if (!storeCache.hasOwnProperty(teamId)) {
    storeCache[teamId] = alt.createStore(TeamScoreStore, `TeamScoreStore#${teamId}`, teamId)
  }
  return storeCache[teamId]
}
