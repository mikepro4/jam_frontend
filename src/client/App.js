import React, { Component } from "react";
import { renderRoutes } from "react-router-config";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FocusStyleManager } from "@blueprintjs/core";
import ReactDOM from "react-dom";
import posed, { PoseGroup } from 'react-pose';
import SplitText from 'react-pose-text';
import keydown from "react-keydown";
import classNames from "classnames"
import { Link } from "react-router-dom";

FocusStyleManager.onlyShowFocusOnTabs();

import Header from "./react/components/header"
import Player from "./react/components/player"


import {
	fetchCurrentUser,
	toggleFullScreenVisualization
} from "./redux/actions/appActions";

class App extends Component {
	static loadData(store, match) {
		return store.dispatch(fetchCurrentUser());
	}

	state = {
	};

	componentDidMount() {
		this.props.fetchCurrentUser();
	}

	@keydown("f")
	toggleFullScreenVisualization() {
		console.log("fullscreen");
		this.props.toggleFullScreenVisualization()
	}

	render() {
		return (
			<div className="app">

				<div className="app-container">

					{!this.props.fullScreen && <Header/ >}

					<Player/>

					<div className="app-content">
						{renderRoutes(this.props.route.routes)}
					</div>

				</div>

			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		location: state.router.location,
		auth: state.app.user,
		fullScreen: state.app.fullScreen
	};
}

export default {
	component: connect(mapStateToProps, {
		fetchCurrentUser,
		toggleFullScreenVisualization
	})(withRouter(App))
};
