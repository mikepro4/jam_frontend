import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import posed, { PoseGroup } from 'react-pose';


class AudioSettings extends Component {
	render() {
    if(this.props.jamScreen.audioSettingsVisible) {
      return (
        <div className="jam-section jam-audio-settings">audio settings</div>
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
    jamScreen: state.jams.jamScreen
	};
}

export default connect(mapStateToProps, {
})(withRouter(AudioSettings));
