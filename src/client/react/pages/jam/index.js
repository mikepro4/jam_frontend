import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import posed, { PoseGroup } from 'react-pose';
import SplitText from 'react-pose-text';

import {
	loadJam,
  clearCurrentJam
} from '../../../redux/actions/jamActions'

import Timeline from './timeline'
import JamToolbar from './jamToolbar'
import AudioSettings from './audioSettings'
import MetadataSettings from './metadataSettings'
import VizSettings from './vizSettings'

import Viz from '../../components/viz'

class JamPage extends Component {
  static loadData(store, match) {
		return store.dispatch(loadJam(match.params.jamId));
	}

	state = {
	};

	componentDidMount() {
    this.props.loadJam(this.props.match.params.jamId)
	}

  componentWillUnmount() {
    this.props.clearCurrentJam()
	}

	componentDidUpdate(prevprops) {
		if(prevprops.match.params.jamId !== this.props.match.params.jamId) {
			this.props.loadJam(this.props.match.params.jamId)
		}
	}

	renderHead = () => (
		<Helmet>
			<title>JAM DNA – Single JAM</title>
			<meta property="og:title" content="single" />
		</Helmet>
	)

	render() {
		return (
      <div className="route-container route-jam">
				{this.renderHead()}
				<div className="jam-container">
					<div className="jam-visualization"><Viz/></div>
					<div className="jam-bottom-container">
						<Timeline />

						<div className="jam-sections-container">
							<AudioSettings />
							<MetadataSettings />
							<VizSettings />
						</div>

						<JamToolbar />
					</div>
				</div>
      </div>
		);
	}
}

function mapStateToProps(state) {
	return {
    currentJam: state.jams.currentJam
	};
}

export default {
	component: connect(mapStateToProps, {
    loadJam,
    clearCurrentJam
  })(JamPage)
}
