import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import posed, { PoseGroup } from 'react-pose';

import {
	changeVizSettings
} from '../../../redux/actions/vizActions'

import VizSettingsForm from './vizSettings_form'

class VizSettings extends Component {
	handleSubmit = values => {
		this.props.onVizUpdate(values)
	}

	render() {
    if(this.props.jamScreen.vizSettingsVisible && this.props.currentJam.defaultViz) {
      return (
        <div className="jam-section jam-viz-settings">
					<button onClick={() => this.props.changeVizSettings({
							shape: {
								boldRate: 10
							}
						},
						this.props.currentJam._id
				)}>change viz</button>
					<VizSettingsForm
						ref="VizSettingsForm"
						enableReinitialize="true"
						initialValues={this.props.currentJam.defaultViz.shape}
						onSubmit={values => {
							this.props.saveViz(values)
						}}
						onChange={values => {
							this.handleSubmit(values)
					}}
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
	changeVizSettings
})(withRouter(VizSettings));
