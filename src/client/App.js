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

class App extends Component {
	state = {
	};

	componentDidMount() {
	}

	render() {
		return (
			<div className="app">

				<div className="app-container">

					<Header/ >

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
	};
}

export default {
	component: connect(mapStateToProps, {
	})(withRouter(App))
};
