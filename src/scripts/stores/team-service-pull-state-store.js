import alt from '../utils/alt'
import TeamServicePullStateActions from '../actions/team-service-pull-state-actions'
import { List } from 'immutable'
import eventManager from '../utils/event-manager'
import TeamServicePullStateModel from '../models/team-service-pull-state-model'

class TeamServicePullStateStore {
  constructor () {
    this.state = {
      loading: true,
      err: null,
      collection: new List()
    }

    this.bindListeners({
      handleUpdate: TeamServicePullStateActions.UPDATE,
      handleFetch: TeamServicePullStateActions.FETCH,
      handleFailed: TeamServicePullStateActions.FAILED,
      handleUpdateSingle: TeamServicePullStateActions.UPDATE_SINGLE
    })

    if (eventManager.enabled) {
      eventManager.eventSource.addEventListener('team/service/pull-state', (e) => {
        let data = JSON.parse(e.data)
        TeamServicePullStateActions.updateSingle(new TeamServicePullStateModel(data))
      })
    }
  }

  handleUpdate (teamServicePullStates) {
    this.setState({
      loading: false,
      err: null,
      collection: teamServicePullStates
    })
  }

  handleUpdateSingle (teamServicePullState) {
    let ndx = this.state.collection.findIndex(x => (x.teamId === teamServicePullState.teamId && x.serviceId === teamServicePullState.serviceId))
    this.setState({
      loading: false,
      err: null,
      collection: (ndx === -1) ? this.state.collection.push(teamServicePullState) : this.state.collection.set(ndx, teamServicePullState)
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

export default alt.createStore(TeamServicePullStateStore, 'TeamServicePullStateStore')
