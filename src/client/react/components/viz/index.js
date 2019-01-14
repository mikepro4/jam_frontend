import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import posed, { PoseGroup } from 'react-pose';
import * as _ from "lodash";

import {
	loadSettings
} from '../../../redux/actions/vizActions'

class Viz extends Component {
	state = {
    width: 0,
    height: 0,
		radius: 0,
    rotate: 0,
    rotate_speed: 0,
    friction: 0,
    speed: 0,
    step: 0,
    freq: 0,
    bold_rate: 0,
		math: "sin",
		pointSize: 0,
		pointOpacity: 0,
    x: 0,
    y: 0
  };

	componentDidMount = () => {
		if(this.props.currentJam._id && this.props.viz) {
			this.loadSettings()
			this.startViz()
		}
		window.addEventListener("resize", this.handleResize);
  }

	componentWillUnmount = () => {
		window.removeEventListener("resize", this.handleResize);
		window.cancelAnimationFrame(this.state.requestAnimationFrame);
	}

	handleResize = () => {
		this.updateDimensions()
	}

	componentDidUpdate = (prevprops) => {
		if(prevprops.currentJam._id !== this.props.currentJam._id) {
			this.loadSettings()
			this.startViz()
		}
		if(!_.isEqual(prevprops.viz.newVizSettings, this.props.viz.newVizSettings)) {
			this.updateViz()
    }
    
    if(this.props.app.fullScreen !== prevprops.app.fullScreen) {
      setTimeout(() => {
        this.handleResize()
      }, 10)
    }
	}

	startViz = () => {
		this.updateDimensions(this.updateViz)
  }

	loadSettings = () => {
		this.props.loadSettings(this.props.currentJam.defaultViz, this.props.currentJam._id)
	}

	updateDimensions = (callback) => {
		let rect = this.refs.viz_container.getBoundingClientRect();

		this.setState({
      width: rect.width * 4,
      height: rect.height * 4,
      radius: (rect.width * 4) / 12,
			x: (rect.width * 4) / 2,
			y: (rect.height * 4) / 2
    }, () => {
			if(callback) {
				callback()
			}
    })
	}

	updateViz = (callback) => {
    let rect = this.refs.viz_container.getBoundingClientRect();

		let vizSource

		if (this.props.viz.newVizSettings) {
			vizSource = 'newVizSettings'
		} else {
			vizSource = 'vizSettings'
		}

    const {
      rotateSpeed,
      friction,
      rotatePointSpeed,
      step,
      frequency,
      boldRate,
      math
    } = this.props.viz[vizSource].shape

    const {
      pointSize,
      pointOpacity,
      pointCount,
      pointColor
    } = this.props.viz[vizSource].point

    const {
      backgroundEnabled,
      backgroundColor,
      backgroundOpacity,
      gradientEnabled,
      gradientColorStops,
      gradientScale,
      gradientRotateDegree,
      gradientType
    } = this.props.viz[vizSource].background

    this.setState({
      rotate_speed: rotateSpeed * 0.1 + 0.001,
      friction: friction * 0.8 + 0.1,
      rotate_point_speed: rotatePointSpeed * 0.2 + 0.03,
      step: step * 0.5 + 0.0001,
      freq: frequency * 0.09 + 0.01,
      bold_rate: boldRate * 0.3 + 0.1,
  		math: math,
      pointSize: pointSize,
      pointCount: pointCount,
      pointOpacity: pointOpacity,
			pointColor: pointColor,
			backgroundColor: backgroundColor,
			backgroundEnabled: backgroundEnabled,
			backgroundOpacity: backgroundOpacity
    }, () => {
			if(!this.state.requestAnimationFrame) {
				this.paint()
			}
    })
  }

	paint = () => {
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d')
    ctx.width = this.state.width;
    ctx.height = this.state.height;
    this.update();
  }

	generatePoints = () => {
    let points = []
    for (var i = 0; i < this.state.pointCount; i++) {
      var pt = this.createPoint(
        Math.random(1) * this.state.width,
        Math.random(1) * this.state.height
      );
      points.push(pt)
    }

    return points
  }

	createPoint(x, y) {
    let point = {
      x: x,
      y: y,
      vx: 0,
      vy: 0
    }
    return point
  }

	update = () => {
		let points = this.generatePoints()
    this.renderFrame(this.refs.canvas.getContext('2d'), points)
  }

	renderOnce = (ctx, points) => {
		ctx.clearRect(0, 0, this.state.width, this.state.height);

    // this.setState({
    //   rotate: this.state.rotate + this.state.rotate_speed
    // })

    let freqData = []
		let soundModifier = 1

    if(this.props.player.analyser) {
      freqData = new Uint8Array(this.props.player.analyser.frequencyBinCount)
      this.props.player.analyser.getByteFrequencyData(freqData)
    }

    for (let i = 0; i < points.length; i++) {
      if(this.props.player.analyser && soundModifier) {
        soundModifier = freqData[this.getPointIterator(i)]/2

        if(soundModifier == 0) {
          soundModifier = 1
        }
      }

      let point = points[i];

			let t_radius = this.calculateRadius(soundModifier, i)

      let tx = this.state.x + Math.cos(this.state.rotate + this.state.step * i) * t_radius;
      let ty = this.state.y + Math.sin(this.state.rotate + this.state.step * i) * t_radius;

      point.vx += (tx - point.x) * this.state.rotate_point_speed;
      point.vy += (ty - point.y) * this.state.rotate_point_speed;

      point.x += point.vx;
      point.y += point.vy;

      point.vx *= this.state.friction;
      point.vy *= this.state.friction;

      if (point.x >= 0 && point.x <= this.state.width && point.y >= 0 && point.y <= this.state.height) {
				ctx.beginPath();
				ctx.arc(point.x,point.y,this.state.pointSize,0,2*Math.PI);
				ctx.fillStyle = `rgba(
					${this.hexToRgb(this.state.pointColor).r},
					${this.hexToRgb(this.state.pointColor).g},
					${this.hexToRgb(this.state.pointColor).b},
					${this.getPointOpacity(freqData[this.getPointIterator(i)])}
				)`;
				ctx.fill();
      }
    }
  }

	hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
	}

	calculateRadius = (soundModifier, i) => {
		let radius = Math[this.state.math](this.state.rotate * soundModifier + this.state.freq * i) * this.state.radius * this.state.bold_rate +
				this.state.radius;

		return radius
	}

	getPointIterator = (i) => {
		if (i <= 1024) {
			return i
		} else {
			return i-1024
		}
	}

	getPointOpacity = (value) => {
		if(value > 0) {
			return value/256*10
		} else {
			return this.state.pointOpacity
		}
	}

	renderFrame = (ctx, points) => {
    this.renderOnce(ctx, points);
		this.setState({
			requestAnimationFrame: requestAnimationFrame(() => this.renderFrame(ctx, points))
		});
  }

	render() {
		return (
      <div 
          className={classNames({"full": this.props.app.fullScreen}, "viz-container")}
          ref="viz_container" 
          style={{
            backgroundColor: this.state.backgroundColor
          }}
			>
        <canvas
          ref="canvas"
          className="viz"
          id="viz"
          width={this.state.width}
          height={this.state.height}
        />
      </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		location: state.router.location,
    app: state.app,
    player: state.player,
    currentJam: state.jams.currentJam,
		viz: state.viz
	};
}

export default connect(mapStateToProps, { loadSettings })(Viz);
