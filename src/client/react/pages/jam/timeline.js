import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import posed, { PoseGroup } from 'react-pose';
import { Icon } from "@blueprintjs/core";

class Timeline extends Component {
	render() {
    return (
      <div className="jam-main-timeline-container">
        <div className="timeline-left">
					<div className="play-button">
          	<Icon icon="play" iconSize={20} />
					</div>

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
          timeline right
        </div>
      </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.app.user,
		location: state.router.location,
    jamScreen: state.jams.jamScreen,
    currentJam: state.jams.currentJam
	};
}

export default connect(mapStateToProps, {
})(withRouter(Timeline));
