import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import posed, { PoseGroup } from 'react-pose';

import {
	toggleAudioSettings,
  toggleJamMetadata,
  toggleVizSettings
} from '../../../redux/actions/jamActions'

class JamToolbar extends Component {
	render() {
		return (
      <div className="jam-toolbar">
        <div className="jam-toolbar-left">
          <ul className="jam-toolbar-buttons">
            <li className="jam-toolbar-button-container">
              <button className="jam-toolbar-button" onClick={() => this.props.toggleAudioSettings()}>Audio settings</button>
            </li>
            <li className="jam-toolbar-button-container">
              <button className="jam-toolbar-button" onClick={() => this.props.toggleJamMetadata()}>Jam metadata</button>
            </li>

            <li className="jam-toolbar-button-container">
              <button className="jam-toolbar-button" onClick={() => this.props.toggleVizSettings()}>Viz settings</button>
            </li>
          </ul>
        </div>
      </div>
		);
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
  toggleAudioSettings,
  toggleJamMetadata,
  toggleVizSettings
})(withRouter(JamToolbar));
