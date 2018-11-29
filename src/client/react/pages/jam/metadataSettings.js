import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import posed, { PoseGroup } from 'react-pose';

import MetadataSettingsForm from './metadataSettings_form'

class MetadataSettings extends Component {

	handleSubmit = values => {
		this.props.onMetadataUpdate(values)
	}

	render() {
    if(this.props.jamScreen.jamMetadataVisible && this.props.currentJam.metadata) {
      return (
        <div className="jam-section jam-metadata-settings">
					<MetadataSettingsForm
						ref="MetadataSettingsForm"
						enableReinitialize="true"
						initialValues={{
							artistName: this.props.currentJam.metadata.artistName,
							trackName: this.props.currentJam.metadata.trackName
						}}
						onSubmit={this.handleSubmit.bind(this)}
					/>
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
    currentJam: state.jams.currentJam
	};
}

export default connect(mapStateToProps, {
})(withRouter(MetadataSettings));
