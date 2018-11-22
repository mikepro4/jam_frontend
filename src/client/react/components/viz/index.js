import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import posed, { PoseGroup } from 'react-pose';

class Viz extends Component {
	state = {
    points: [],
    width: 0,
    height: 0,
    rotate: 0,
    rotate_speed: 0,
    friction: 0,
    speed: 0,
    step: 0,
    freq: 0,
    bold_rate: 0,
		math: "",
		pointSize: 0,
		pointOpacity: 0,
    x: 0,
    y: 0,
    radius: 0
  };

	render() {
		return (
      <div className="viz-container" ref="viz_container">
        <canvas
          ref="canvas"
          className="viz"
          width={this.state.width}
          height={this.state.height}
        />
      </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		location: state.router.location,
    app: state.app,
    player: state.player,
    currentJam: state.currentJam
	};
}

export default connect(mapStateToProps, {})(Viz);
