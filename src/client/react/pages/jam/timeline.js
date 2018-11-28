import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import posed, { PoseGroup } from 'react-pose';
import { Icon } from "@blueprintjs/core";

import {
	trackPlay,
	trackPause,
	trackSeek
} from '../../../redux/actions/playerActions'

class Timeline extends Component {

	renderPlayPauseButton = () => {
		if(this.props.player.status == "pause" || this.props.player.status == "stop") {
			return (
				<div className="play-button" onClick={() => this.props.trackPlay(this.props.currentJam)}>
					<Icon icon="play" iconSize={20} />
				</div>
			)
		} else if (this.props.player.status == "play") {
			return (
				<div className="play-button" onClick={() => this.props.trackPause(this.props.currentJam)}>
					<Icon icon="pause" iconSize={20} />
				</div>
			)
		}
	}

	render() {

		if(this.props.currentJam.metadata) {
			return (
	      <div className="jam-main-timeline-container">
	        <div className="timeline-left">
						{this.renderPlayPauseButton()}

						<div className="jam-title-container">
							<div className="artist-name">
								{this.props.currentJam.metadata.artistName}
							</div>

							<div className="track-name">
								{this.props.currentJam.metadata.trackName}
							</div>
						</div>
	        </div>

	        <div className="timeline-right">
	          timeline right: {this.props.currentJam.metadata.duration}
						currentTime: {this.props.player.currentTime}
	        </div>
	      </div>
			);
		} else {
			return ""
		}
	}
}

function mapStateToProps(state) {
	return {
		user: state.app.user,
		location: state.router.location,
    jamScreen: state.jams.jamScreen,
    currentJam: state.jams.currentJam,
		player: state.player
	};
}

export default connect(mapStateToProps, {
	trackPlay,
	trackPause,
	trackSeek
})(withRouter(Timeline));
