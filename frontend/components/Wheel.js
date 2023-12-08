import React from 'react'
import { connect } from 'react-redux'
import { moveClockwise, moveCounterClockwise } from '../state/action-creators'

function Wheel (props) {
  const clockWiseClick = () => {
    props.moveClockwise(1);
  };

  const counterClockWiseClick = () => {
    props.moveCounterClockwise(-1);
  };

  return (
    <div id="wrapper">
      <div id="wheel">
        <div className={props.initialWheelState === 0 ? "cog active" : "cog"} style={{ "--i": 0 }}>{props.initialWheelState === 0 ? 'B' : ''}</div>
        <div className={props.initialWheelState === 1 ? "cog active" : "cog"} style={{ "--i": 1 }}>{props.initialWheelState === 1 ? 'B' : ''}</div>
        <div className={props.initialWheelState === 2 ? "cog active" : "cog"} style={{ "--i": 2 }}>{props.initialWheelState === 2 ? 'B' : ''}</div>
        <div className={props.initialWheelState === 3 ? "cog active" : "cog"} style={{ "--i": 3 }}>{props.initialWheelState === 3 ? 'B' : ''}</div>
        <div className={props.initialWheelState === 4 ? "cog active" : "cog"} style={{ "--i": 4 }}>{props.initialWheelState === 4 ? 'B' : ''}</div>
        <div className={props.initialWheelState === 5 ? "cog active" : "cog"} style={{ "--i": 5 }}>{props.initialWheelState === 5 ? 'B' : ''}</div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={counterClockWiseClick} >Counter clockwise</button>
        <button id="clockwiseBtn" onClick={clockWiseClick}>Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    initialWheelState: state.wheel
  }
}


export default connect(mapStateToProps, { moveClockwise, moveCounterClockwise })(Wheel)


