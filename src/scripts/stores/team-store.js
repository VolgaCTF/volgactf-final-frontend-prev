import alt from '../utils/alt'
import TeamActions from '../actions/team-actions'
import TeamModel from '../models/team-model'
import eventManager from '../utils/event-manager'
import { List } from 'immutable'

class TeamStore {
  constructor () {
    this.state = {
      loading: true,
      err: null,
      collection: new List()
    }

    this.bindListeners({
      handleUpdate: TeamActions.UPDATE,
      handleFetch: TeamActions.FETCH,
      handleOnModify: TeamActions.ON_MODIFY,
      handleFailed: TeamActions.FAILED
    })

    eventManager.on('team/modify', (e) => {
      const data = JSON.parse(e.data)
      TeamActions.onModify(new TeamModel(data))
    })

  }

  handleUpdate (teams) {
    this.setState({
      loading: false,
      err: null,
      collection: teams
    })
  }

  handleOnModify (team) {
    const ndx = this.state.collection.findIndex(x => x.id === team.id)
    this.setState({
      loading: false,
      err: null,
      collection: (ndx === -1) ? this.state.collection.push(team) : this.state.collection.set(ndx, team)
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

export default alt.createStore(TeamStore, 'TeamStore')
