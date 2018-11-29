import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import posed, { PoseGroup } from 'react-pose';
import SplitText from 'react-pose-text';
import * as _ from "lodash";

import {
	loadJam,
  clearCurrentJam,
	updateJam
} from '../../../redux/actions/jamActions'


import {
	changeVizSettings
} from '../../../redux/actions/vizActions'

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

	updateJamAudio = (sound) => {
		let newJam = {
			...this.props.currentJam,
			metadata: {
				...this.props.currentJam.metadata,
				duration: sound.duration,
				audioUrl: sound.url
			}
		}

		this.props.updateJam(this.props.currentJam._id, newJam)
	}

	updateJamMetadata = (metadata) => {
		let newJam = {
			...this.props.currentJam,
			metadata: {
				...this.props.currentJam.metadata,
				artistName: metadata.artistName,
				trackName: metadata.trackName
			}
		}

		this.props.updateJam(this.props.currentJam._id, newJam)
	}

	updateJamViz = (values) => {
		//
		// let newJamValues = _.merge({}, this.props.currentJam.defaultViz.shape, values)
		//
		// let newJam = {
		// 	...this.props.currentJam,
		// 	defaultViz: {
		// 		shape: newJamValues,
		// 		background: this.props.currentJam.defaultViz.background,
		// 		point: this.props.currentJam.defaultViz.point,
		// 	}
		// }

		// console.log(newJam)

		// this.props.updateJam(this.props.currentJam._id, newJam)
		this.props.changeVizSettings({
			shape: {
				...values
			}
		})
	}

	saveViz = (values) => {
		let newJamValues = _.merge({}, this.props.currentJam.defaultViz.shape, values)

		let newJam = {
			...this.props.currentJam,
			defaultViz: {
				shape: newJamValues,
				background: this.props.currentJam.defaultViz.background,
				point: this.props.currentJam.defaultViz.point,
			}
		}

		this.props.updateJam(this.props.currentJam._id, newJam)
	}

	render() {
		return (
      <div className="route-container route-jam">
				{this.renderHead()}
				<div className="jam-container">
					<div className="jam-visualization"><Viz/></div>
					<div className="jam-bottom-container">
						<Timeline />

						<div className="jam-sections-container">
							<AudioSettings onAudioUpdate={(sound) => this.updateJamAudio(sound)}/>
							<MetadataSettings onMetadataUpdate={(metadata) => this.updateJamMetadata(metadata)} />
							<VizSettings
								onVizUpdate={(viz) => this.updateJamViz(viz)}
								saveViz={(viz) => this.saveViz(viz)}
							/>
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
    clearCurrentJam,
		updateJam,
		changeVizSettings
  })(JamPage)
}
