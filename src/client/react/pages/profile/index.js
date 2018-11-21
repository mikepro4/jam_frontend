import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import posed, { PoseGroup } from 'react-pose';
import SplitText from 'react-pose-text';

class ProfilePage extends Component {
	state = {
	};

	componentDidMount() {
	}

	renderHead = () => (
		<Helmet>
			<title>JAM DNA – Profile</title>
			<meta property="og:title" content="profile" />
		</Helmet>
	)

	render() {
		return (
      <div className="route-container route-profile">
        profile: {this.props.match.params.profileId}
      </div>
		);
	}
}

function mapStateToProps({ app }) {
	return {
	};
}

export default {
	component: connect(mapStateToProps, {})(ProfilePage)
}
