import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import posed, { PoseGroup } from 'react-pose';

class Viz extends Component {
	state = {
    points: [],
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
		math: "",
		pointSize: 0,
		pointOpacity: 0,
    x: 0,
    y: 0,
		rectWidth: 0,
		rectHeight: 0,
		rectRadius: 0
  };

	componentDidMount = () => {
		if(this.props.currentJam._id) {
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
			this.startViz()
		}
	}

	startViz = () => {
		this.updateDimensions(this.updateViz)
  }

	updateDimensions = (callback) => {
		let rect = this.refs.viz_container.getBoundingClientRect();

		this.setState({
      width: rect.width * 2,
      height: rect.height * 2,
      radius: (rect.width * 2) / 6,
      rectWidth: rect.width * 2,
      rectHeight: rect.height * 2,
      rectRadius: (rect.width * 2) / 5,
			x: (rect.width * 2) / 2,
			y: (rect.height * 2) / 2
    }, () => {
			if(callback) {
				callback()
			}
    })
	}

	updateViz = () => {

    let rect = this.refs.viz_container.getBoundingClientRect();

    const {
      rotateSpeed,
      friction,
      rotatePointSpeed,
      step,
      frequency,
      boldRate,
      math
    } = this.props.currentJam.defaultViz.shape

    const {
      pointSize,
      pointOpacity,
      pointCount,
      pointColor
    } = this.props.currentJam.defaultViz.point

    const {
      colorEnabled,
      colorValue,
      colorOpacity,
      gradientEnabled,
      gradientColorStops,
      gradientScale,
      gradientRotateDegree,
      gradientType
    } = this.props.currentJam.defaultViz.background

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
    }, () => {
      this.paint()
    })
  }

	paint = () => {
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d')
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.width = this.state.width;
    ctx.height = this.state.height;
    this.update();
  }

	generatePoints = () => {
    let points = []
    const pointsAmount = 2048
    for (var i = 0; i < pointsAmount; i++) {
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

    this.setState({
      rotate: this.state.rotate + this.state.rotate_speed
    })

    let freqData = []

    if(this.props.player.analyser) {
      freqData = new Uint8Array(this.props.player.analyser.frequencyBinCount)
      this.props.player.analyser.getByteFrequencyData(freqData)
    }

    for (let i = 0; i < points.length; i++) {

			let soundModifier

      if(this.props.player.analyser) {
        if (i <= 1024) {
          soundModifier = freqData[i]/2
        } else {
          soundModifier = freqData[i-1024]/2
        }

        if(soundModifier == 0) {
          soundModifier = 1
        }
      } else {
        soundModifier = 1
      }

      let point = points[i];

			let t_radius

			if (this.state.math == "sin") {
				t_radius =
	        Math.sin(this.state.rotate * soundModifier + this.state.freq * i) * this.state.radius * this.state.bold_rate +
	        this.state.radius;
			} else if (this.state.math == "cos") {
				t_radius =
	        Math.cos(this.state.rotate * soundModifier + this.state.freq * i) * this.state.radius * this.state.bold_rate +
	        this.state.radius;
			} else if (this.state.math == "tan") {
				t_radius =
	        Math.tan(this.state.rotate * soundModifier + this.state.freq * i) * this.state.radius * this.state.bold_rate +
	        this.state.radius;
			} else if (this.state.math == "atan") {
				t_radius =
	        Math.atan(this.state.rotate * soundModifier + this.state.freq * i) * this.state.radius * this.state.bold_rate +
	        this.state.radius;
			} else if (this.state.math == "log") {
				t_radius =
	        Math.log(this.state.rotate * soundModifier + this.state.freq * i) * this.state.radius * this.state.bold_rate +
	        this.state.radius;
			}

      let tx = this.state.x + Math.cos(this.state.rotate + this.state.step * i) * t_radius;
      let ty = this.state.y + Math.sin(this.state.rotate + this.state.step * i) * t_radius;

      point.vx += (tx - point.x) * this.state.rotate_point_speed;
      point.vy += (ty - point.y) * this.state.rotate_point_speed;

      point.x += point.vx;
      point.y += point.vy;

      point.vx *= this.state.friction ;
      point.vy *= this.state.friction ;

      if (point.x >= 0 && point.x <= this.state.width && point.y >= 0 && point.y <= this.state.height) {
        // ctx.fillRect(point.x, point.y, this.state.pointSize, this.state.pointSize);
				ctx.beginPath();

				ctx.arc(point.x,point.y,this.state.pointSize,0,2*Math.PI);
				ctx.fillStyle = `rgba(255,255,255,${this.state.pointOpacity})`;
				ctx.fill();
      }
    }
  }

	renderFrame = (ctx, points) => {
    // if(this.props.currentJam._id == this.props.player.jamId) {
      this.renderOnce(ctx, points)
    // }

		this.setState({
			requestAnimationFrame: requestAnimationFrame(() => this.renderFrame(ctx, points))
		})
  }

	render() {
		return (
      <div className="viz-container" ref="viz_container">
        <canvas
          ref="canvas"
          className="viz"
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
    currentJam: state.jams.currentJam
	};
}

export default connect(mapStateToProps, {})(Viz);
