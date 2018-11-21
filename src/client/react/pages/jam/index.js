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

	renderHead = () => (
		<Helmet>
			<title>JAM DNA – Single JAM</title>
			<meta property="og:title" content="single" />
		</Helmet>
	)

	render() {
		return (
      <div className="route-container route-jam">
        jam: {this.props.currentJam._id}
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
