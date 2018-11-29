import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { change } from "redux-form";

class Slider extends Component {
  state = {
    inputFocused: false,
  };

  onBlur = () => {
    this.setState({
      inputFocused: false
    })
  }

  onFocus = () => {
    this.setState({
      inputFocused: true
    })
  }

	render() {
		return (
      <div className="slider-container">
        <div onClick={() => this.props.meta.dispatch(change('viz_settings', this.props.input.name, 20)) }>change</div>
        {this.props.label}
        <input {...this.props.input}   />
      </div>
		);
	}
}

function mapStateToProps(state) {
	return {
	};
}

export default connect(mapStateToProps, {})(Slider);
