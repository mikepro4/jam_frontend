import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";

class Input extends Component {
  state = {
    inputFocused: false
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
    let characterCount = this.props.input.value.length

    let containerClassName = classnames({
      "input-container": true,
      "input-large": this.props.large,
      "input-empty": characterCount == 0,
      "input-touched": this.props.meta.touched,
      "input-valid": this.props.meta.touched && !this.props.meta.error,
      "input-invalid":this.props.meta.touched && this.props.meta.error,
      "input-focused": this.state.inputFocused
    });

    let inputClassName = classnames({
      "input": true,
      "input-intent-success": this.props.meta.touched && !this.props.meta.error,
      "input-intent-danger": this.props.meta.touched && this.props.meta.error
    });

    let labelClassName = classnames({
      "input-placeholder": true,
      "input-placeholder-large": true,
      "input-placeholder-large-visible": !this.state.inputFocused & characterCount == 0
    })

		return (
      <div className={containerClassName}>

        <div className={labelClassName}>
          {this.props.label}
        </div>

        <div className="input-wrapper">
          <input
            {...this.props.input}
            className={inputClassName}
            placeholder={this.props.placeholder}
            type={this.props.type}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            autoComplete="new-password"
          />
        </div>

        {(this.props.meta.touched && !this.props.meta.valid && this.state.inputFocused) || (this.props.meta.touched && !this.props.meta.valid && characterCount > 0 ) ? (
          <div className="input-error">
            <span>{this.props.meta.error}</span>
          </div>
        ) : (
          ""
        )}

      </div>
		);
	}
}

function mapStateToProps(state) {
	return {
	};
}

export default connect(mapStateToProps, {})(Input);
