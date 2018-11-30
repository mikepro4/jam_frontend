import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { change } from "redux-form";

class Slider extends Component {
  state = {
    inputFocused: false,
    min: 0,
    max: 0,
    currentValue: 0,
    clickActive: false
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

  onMouseMove = (value) => {
    if(this.state.clickActive) {
      this.calculateWidth(value)
    }
  }

  onMouseLeave = (value) => {
    this.setState({
      clickActive: false
    })
  }

  onMouseDown = (value) => {
    this.setState({
      clickActive: true
    })
  }

  onMouseUp = (value) => {
    this.setState({
      clickActive: false
    })
  }

  setMin = () => {
    this.changeValue(this.state.min)
  }

  setMax = () => {
    this.changeValue(this.state.max)
  }

  add = () => {
    if(this.props.input.value < this.state.max ) {
      this.changeValue(Number(this.props.input.value) + 0.01)
    }
  }

  subtract = () => {
    if(this.props.input.value >= 0.01 ) {
      this.changeValue(Number(this.props.input.value) - 0.01)
    }
  }

  setMid = () => {
    this.changeValue(Number(this.state.max)/2)
  }

  setPercent = (percent) => {
    let value = percent * this.state.max / 100
    this.changeValue(value)
  }

	render() {
		return (
      <div className="input-container slider-container">
        <div className="input-label">
          {this.props.label}
        </div>

        <div className="input-right">
          <div className="control-container">
            <div
              className="control-slider-container"
              ref="slider"
              onClick={(e) => this.calculateWidth(e)}
              onMouseLeave={this.onMouseLeave.bind(this)}
              onMouseMove={this.onMouseMove.bind(this)}
              onMouseDown={this.onMouseDown.bind(this)}
              onMouseUp={this.onMouseUp.bind(this)}
            >
              <div className="control-slider-bar" style={{
                width: this.getBarWidth()
              }}/>
            </div>

            <div className="control-input">
              <input {...this.props.input}   />
            </div>
          </div>

          <div className="action-container">
            <ul className="action-list">
              <li className="action-item">
                <button className="input-action-button" onClick={() => this.setMin()}>Min</button>
              </li>

              <li className="action-item">
                <button className="input-action-button" onClick={() => this.setPercent(10)}>10%</button>
              </li>

              <li className="action-item">
                <button className="input-action-button" onClick={() => this.setPercent(25)}>25%</button>
              </li>

              <li className="action-item">
                <button className="input-action-button" onClick={() => this.setPercent(50)}>50%</button>
              </li>

              <li className="action-item">
                <button className="input-action-button" onClick={() => this.setPercent(75)}>75%</button>
              </li>


              <li className="action-item">
                <button className="input-action-button" onClick={() => this.setMax()}>Max</button>
              </li>

              <li className="action-item">
                <button className="input-action-button" onClick={() => this.add()}>+</button>
              </li>

              <li className="action-item">
                <button className="input-action-button" onClick={() => this.subtract()}>-</button>
              </li>
            </ul>
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
