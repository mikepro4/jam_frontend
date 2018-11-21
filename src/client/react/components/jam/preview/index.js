import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import posed, { PoseGroup } from 'react-pose';

class JamPreview extends Component {

	render() {
		return (
			<div className="jam-preview-container">
        preview
      </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		location: state.router.location
	};
}

export default connect(mapStateToProps, {})(JamPreview);