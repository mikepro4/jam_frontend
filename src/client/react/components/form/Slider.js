import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { change } from "redux-form";

class Slider extends Component {
  state = {
    inputFocused: false,
    min: 0,
    max: 0,
    currentValue: 0
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

  componentDidMount = () => {
    this.setState({
      min: this.props.min,
      max: this.props.max,
      currentValue: this.props.input.value
    })
  }

  componentDidUpdate = (prevprops) => {
    if(prevprops.input.value !== this.props.input.value) {
      this.setState({
        currentValue: this.props.input.value
      })
    }
  }

  getBarWidth = (e) => {
    let value = Number(this.state.currentValue)
    let width = value * 100 / this.state.max
    return `${width}%`
  }

  calculateWidth(event) {
    const relX = event.pageX - (this.refs.slider.offsetLeft)
    const progressBarPercent = relX * 100 / this.refs.slider.getBoundingClientRect().width

    let newValue = this.state.max *progressBarPercent / 100

    this.changeValue(newValue)
  }

  changeValue = (value) => {
    this.props.meta.dispatch(change(this.props.meta.form, this.props.input.name, value))
  }

	render() {
		return (
      <div className="input-container slider-container">
        <div className="input-label">
          {this.props.label}
        </div>

        <div className="control-container">
          <div className="control-slider-container" ref="slider" onClick={(e) => this.calculateWidth(e)}>
            <div className="control-slider-bar" style={{
              width: this.getBarWidth()
            }}/>
          </div>

          <div className="control-input">
            <input {...this.props.input}   />
          </div>
        </div>
      </div>
		);
	}
}

function mapStateToProps(state) {
	return {
    form: state.form
	};
}

export default connect(mapStateToProps, {})(Slider);
