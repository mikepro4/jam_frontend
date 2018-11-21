import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import posed, { PoseGroup } from 'react-pose';

import Logo from '../svg/logo'
import MainLinks from '../main_links'

class Header extends Component {

	renderAuthButton() {
		return this.props.user ? (
			<div className="user-info">

			<a href="/jam/new" className="new-jam-button">
				Create new jam
			</a>

			<div className="user-avatar-container">
				<img
					className="user-avatar"
					src={this.props.user.profile.photos[0].value}
				/>
				<span className="user-display-name">
					{this.props.user.profile.displayName}
				</span>
			</div>

			<a href="/api/logout" className="logout-button">
				Logout
			</a>

			</div>
		) : (
			<div className="user-info">
				<a href="/api/auth/google" className="login-button">
					Login with Google
				</a>
			</div>
		);
	}

	render() {
		return (
			<div className="app-header">

        <div className="header-left">
					<div className="app-logo">
						<Link to='/'><Logo/></Link>
					</div>
					<MainLinks isVisible={true} />
				</div>

				<div className="header-right">

					<div className="user-info-container">
						{this.renderAuthButton()}
					</div>
				</div>
      </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.app.user,
		location: state.router.location
	};
}

export default connect(mapStateToProps, {})(Header);
