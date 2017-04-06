import ScoreboardPositionModel from './scoreboard-position-model'

export default class ScoreboardModel {
  constructor (props) {
    this.muted = props.muted
    this.positions = props.positions.map((positionProps) => {
      return new ScoreboardPositionModel(positionProps)
    })
  }
}
