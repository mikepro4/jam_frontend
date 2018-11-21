import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import posed, { PoseGroup } from 'react-pose';
import SplitText from 'react-pose-text';

import {
	searchJams,
	deleteJam
} from '../../../redux/actions/jamActions'

import JamPreview from '../../components/jam/preview/'

class MyJams extends Component {
	state = {
	};

	componentDidMount() {
    if(this.props.user) {
      this.loadJams()
    }
	}

  componentDidUpdate(prevprops) {
    if(prevprops.user !== this.props.user) {
      this.loadJams()
    }

		if(prevprops.updateCollection !== this.props.updateCollection) {
			this.loadJams()
		}

  }

  loadJams = () => {
    this.props.searchJams(
      { userId: this.props.user._id },
      "createdAt",
      0,
      0,
      () => {
        console.log("loaded")
      }
    );
  }

	renderHead = () => (
		<Helmet>
			<title>JAM DNA – My Jams</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
	)

	render() {
		return (
      <div className="route-container route-myjams">
				{this.props.jamsCollection.map(jam => {
					return <JamPreview key={jam._id} jam={jam} />
				})}
      </div>
		);
	}
}

function mapStateToProps(state) {
	return {
    user: state.app.user,
    jamsCollection: state.jams.loadedJamsCollection,
		updateCollection: state.jams.updateCollection
	};
}

export default {
	component: connect(mapStateToProps, {searchJams, deleteJam})(MyJams)
}
