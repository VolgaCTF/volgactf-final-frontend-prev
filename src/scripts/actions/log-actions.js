import alt from '../utils/alt'

class LogActions {
  push (logs) {
    return (dispatch) => {
      dispatch(logs)
    }
  }
}

export default alt.createActions(LogActions)
