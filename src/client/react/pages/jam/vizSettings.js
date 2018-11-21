import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import posed, { PoseGroup } from 'react-pose';


class VizSettings extends Component {
	render() {
    if(this.props.jamScreen.vizSettingsVisible) {
      return (
        <div className="jam-section jam-viz-settings"> viz settings</div>
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
    currentJam: state.jams.currentJam
	};
}

export default connect(mapStateToProps, {
})(withRouter(VizSettings));
