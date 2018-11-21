import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import posed, { PoseGroup } from 'react-pose';


class MetadataSettings extends Component {
	render() {
    if(this.props.jamScreen.jamMetadataVisible) {
      return (
        <div className="jam-section jam-metadata-settings"> jam: {this.props.currentJam._id} </div>
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
})(withRouter(MetadataSettings));
