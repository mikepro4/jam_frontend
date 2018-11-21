import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import posed, { PoseGroup } from 'react-pose';
import SplitText from 'react-pose-text';

class JamPage extends Component {
	state = {
	};

	componentDidMount() {
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
        jam: {this.props.match.params.jamId}
      </div>
		);
	}
}

function mapStateToProps({ app }) {
	return {
	};
}

export default {
	component: connect(mapStateToProps, {})(JamPage)
}
