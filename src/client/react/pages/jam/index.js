import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import SplitText from 'react-pose-text';
import posed, { PoseGroup } from 'react-pose';
import * as _ from "lodash";
import classNames from "classnames"
import keydown from "react-keydown";

import {
	loadJam,
  	clearCurrentJam,
	updateJam
} from '../../../redux/actions/jamActions'

import {
	changeVizSettings
} from '../../../redux/actions/vizActions'

import Timeline from './timeline'
import JamToolbar from './jamToolbar'
import AudioSettings from './audioSettings'
import MetadataSettings from './metadataSettings'
import VizSettings from './vizSettings'

import Viz from '../../components/viz'

const wordPoses = {
	exit: { 
		translateY: 50, 
		opacity: 0 
	},

	out: {
		translateY: -50,
		opacity: 0,
		transition: {
			duration: 400,
		},
		delay: ({ wordIndex }) => wordIndex * 40
	},

	enter: {
	  translateY: 0,
	  opacity: 1,
	  transition: {
	   		duration: 400,
			delay: 500
	  },
	  delay: ({ wordIndex }) => wordIndex * 40
	}
};

const BottomLabelPoses = {
	out: { 
		translateY: -30, 
		opacity: 0,
		transition: {
			duration: 600,
		},
	},
	exit: { translateY: 30, opacity: 0 },
	enter: {
	  translateY: 0,
	  opacity: 1,
	  transition: {
	   duration: 600,
	   },
	   delay: ({ wordIndex }) => wordIndex * 50
	}
  };
  
const Line = posed.div({
	exit: { left: "-100%", opacity: 0 },
	out: { 
		left: "200%",
		transition: {
			duration: 600,
		}
	},
	enter: {
	  left: 0,
	  opacity: 1,
	  transition: {
	   duration: 600,
	  }
	}
});

const VizDiv = posed.div({
	exit: {
		opacity: 0,
	},
	out: {
		opacity: 0,
		transition: {
			 opacity: {
				 duration: 700,
			 },
		}
	},
	enter: {
		opacity: 1,
		transition: {
			opacity: {
				duration: 3000,
			}
		}
	}
})

const DCDNT = posed.div({
	exit: {
		opacity: 0, 
		scale: 0.4,
		letterSpacing: 3,
	},
	out: {
		opacity: 0,
		scale: 1.08,
		transition: {
			 opacity: {
				 duration: 500,
			 },
			 scale: {
				 duration: 500
			 }
		}
	},
	enter: {
		opacity: 1,
		scale: 1,
		letterSpacing: 13,
		transition: {
			opacity: {
				duration: 3000,
				delay: 500
			},
			letterSpacing: {
				duration: 7000,
				delay: 300
			},
			scale: {
				duration: 400
			}
		}
	}
})

class JamPage extends Component {
  static loadData(store, match) {
		return store.dispatch(loadJam(match.params.jamId));
	}

	state = {
		lineDelay: 50,
		intro_visible: true,
		
		left_label_visible: false,
		left_label_out: false,

		right_label_visible: false,
		right_label_out: false,

		line_visible: false,
		line_out: false,
		
		viz_visible: false,
		viz_out: false,

		screen_1_line_1_visible: false,
		screen_1_line_1_out: false,

		screen_1_line_2_visible: false,
		screen_1_line_2_out: false,

		screen_2_line_1_visible: false,
		screen_2_line_1_out: false,

		screen_2_line_2_visible: false,
		screen_2_line_2_out: false,

		screen_2_line_3_visible: false,
		screen_2_line_3_out: false,

		screen_2_line_4_visible: false,
		screen_2_line_4_out: false,

		screen_4_line_1_visible: false,
		screen_4_line_1_out: false,

		screen_4_line_2_visible: false,
		screen_4_line_2_out: false,

		screen_4_line_3_visible: false,
		screen_4_line_3_out: false,

		screen_4_line_4_visible: false,
		screen_4_line_4_out: false,

		screen_4_bottom_line_visible: false,
		screen_4_bottom_line_out: false,

		screen_4_bottom_dcdnt_visible: false,
		screen_4_bottom_dcdnt_out: false,

		dcdnt_visible: false,
		dcdnt_out: false

	};

	componentDidMount() {
		this.props.loadJam(this.props.match.params.jamId)
	}

	@keydown("1")
	showIntro() {
		this.showScreen1()
		setTimeout(()=> {
			this.showIntroFooter() 
		}, 1000)
	}

	@keydown("2")
	showDesktopOutro() {
		this.showScreen4()
	}

  	componentWillUnmount() {
    this.props.clearCurrentJam()
	}

	componentDidUpdate(prevprops) {
		if(prevprops.match.params.jamId !== this.props.match.params.jamId) {
			this.props.loadJam(this.props.match.params.jamId)
		}
	}

	renderHead = () => (
		<Helmet>
			<title>JAM DNA – Single JAM</title>
			<meta property="og:title" content="single" />
		</Helmet>
	)

	updateJamAudio = (sound) => {
		let newJam = {
			...this.props.currentJam,
			metadata: {
				...this.props.currentJam.metadata,
				duration: sound.duration,
				audioUrl: sound.url
			}
		}

		this.props.updateJam(this.props.currentJam._id, newJam)
	}

	updateJamMetadata = (metadata) => {
		let newJam = {
			...this.props.currentJam,
			metadata: {
				...this.props.currentJam.metadata,
				artistName: metadata.artistName,
				trackName: metadata.trackName
			}
		}

		this.props.updateJam(this.props.currentJam._id, newJam)
	}

	updateJamViz = (values) => {
		this.props.changeVizSettings(values)
	}

	saveViz = (values) => {
		let newJamValues = _.merge({}, this.props.currentJam.defaultViz.shape, values)

		let newJam = {
			...this.props.currentJam,
			defaultViz: this.props.viz.newVizSettings
		}

		this.props.updateJam(this.props.currentJam._id, newJam)
	}

	showScreen1 = () => {
		this.setState({
			screen_1_line_1_visible: true
		})

		setTimeout(() => {
			this.setState({
				screen_1_line_2_visible: true
			})
		}, this.state.lineDelay)

		setTimeout(() => {
			this.setState({
				screen_1_line_1_out: true
			})
		}, 3000)

		setTimeout(() => {
			this.setState({
				screen_1_line_2_out: true,
			})
		}, 3000 + this.state.lineDelay)

		setTimeout(() => {
			this.showScreen2()
		}, 3400)
	}

	showScreen2 = () => {
		this.setState({
			screen_2_line_1_visible: true
		})

		// show

		setTimeout(() => {
			this.setState({
				screen_2_line_2_visible: true
			})
		}, this.state.lineDelay)

		setTimeout(() => {
			this.setState({
				screen_2_line_3_visible: true
			})
		}, this.state.lineDelay*2)

		setTimeout(() => {
			this.setState({
				screen_2_line_4_visible: true
			})
		}, this.state.lineDelay*4)

		// hide

		setTimeout(() => {
			this.setState({
				screen_2_line_1_out: true
			})
		}, 3000)

		setTimeout(() => {
			this.setState({
				screen_2_line_2_out: true
			})
		}, 3000 + this.state.lineDelay)

		setTimeout(() => {
			this.setState({
				screen_2_line_3_out: true
			})
		}, 3000 + this.state.lineDelay*2)

		setTimeout(() => {
			this.setState({
				screen_2_line_4_out: true
			})
		}, 3000 + this.state.lineDelay*3)

		// show viz
		setTimeout(() => {
			this.showViz()
		}, 1000 )
		
	}

	showViz = () => {
		this.setState({
			viz_visible: true
		})

		// show DCDNT

		setTimeout(() => {
			this.showDCDNT()
		}, 3000)
	}

	showDCDNT = () => {
		this.setState({
			dcdnt_visible: true
		})

		// hide everything
		setTimeout(() => {
			this.hideIntro()
		}, 4500 )

		setTimeout(() => {
			this.hideIntroFooter()
		}, 4000 )
	}

	hideIntro = () => {
		this.setState({
			dcdnt_out: true,
			viz_out: true
		})
	}

	showIntroFooter = () => {
		this.setState({
			left_label_visible: true
		})
	}

	hideIntroFooter = () => {
		this.setState({
			left_label_out: true
		})

		setTimeout(() => {
			this.setState({
				line_out: true
			})
		}, 200 )

		setTimeout(() => {
			this.setState({
				right_label_out: true
			})
		}, 500 )
	}

	showScreen4 = () => {
		this.setState({
			screen_4_line_1_visible: true
		})

		// show

		setTimeout(() => {
			this.setState({
				screen_4_line_2_visible: true
			})
		}, this.state.lineDelay)

		setTimeout(() => {
			this.setState({
				screen_4_line_3_visible: true
			})
		}, this.state.lineDelay*2)

		setTimeout(() => {
			this.setState({
				screen_4_line_4_visible: true
			})
		}, this.state.lineDelay*4)

		// show footer

		setTimeout(() => {
			this.setState({
				screen_4_bottom_line_visible: true
			})
		}, 1000)

		setTimeout(() => {
			this.setState({
				screen_4_bottom_dcdnt_visible: true
			})
		}, 1000)

		// hide
	}

	getPoseName = (element) => {
		let elementVisible = element + "_visible";
		let elementOut = element + "_out";
		if (this.state[elementOut]) {
			return "out"
		}

		if (this.state[elementVisible]) {
			return "enter"
		}

		if (!this.state[elementVisible]) {
			return "exit"
		}
	}

	render() {
		return (
      <div className="route-container route-jam">
				{this.renderHead()}
				<div 
					className={classNames({"full": this.props.fullScreen}, "jam-container")}
				>
					<div className="jam-intro">
						<div className="screen screen_1">

							<div className="text_line text_line_1 of">
								<SplitText
									pose={this.getPoseName("screen_1_line_1")}
									wordPoses={wordPoses}
									className="word"
								>
									MIKHAIL
								</SplitText>
							</div>

							<div className="text_line text_line_2 of">
								<SplitText
									pose={this.getPoseName("screen_1_line_2")}
									wordPoses={wordPoses}
									className="word"
								>
									PRONIUSHKIN
								</SplitText>
							</div>
							{/* <div className="dcdnt">
								DCDNT
							</div> */}
						</div>

						<div className="screen screen_2">

							<div className="text_line text_line_1 of">
								<SplitText
									pose={this.getPoseName("screen_2_line_1")}
									wordPoses={wordPoses}
									className="word"
								>
									LIVE
								</SplitText>
							</div>

							<div className="text_line text_line_2 of">
								<SplitText
									pose={this.getPoseName("screen_2_line_2")}
									wordPoses={wordPoses}
									className="word"
								>
									TECHNO
								</SplitText>
							</div>

							<div className="text_line text_line_2 of">
								<SplitText
									pose={this.getPoseName("screen_2_line_3")}
									wordPoses={wordPoses}
									className="word"
								>
									SESSION
								</SplitText>
							</div>

							<div className="text_line text_line_2 of">
								<SplitText
									pose={this.getPoseName("screen_2_line_4")}
									wordPoses={wordPoses}
									className="word"
								>
									0009
								</SplitText>
							</div>

						</div>

						<div className="screen screen_3">
							<div className="dcdnt_container">
								<DCDNT
									initialPose="exit"
									pose={this.getPoseName("dcdnt")}
									wordPoses={wordPoses}
									className="dcdnt"
								>
									DCDNT
								</DCDNT>
							</div>
						</div>

						<div className="screen screen_4">
							<div className="text_line text_line_1 of small_text_line">
								<SplitText
									pose={this.getPoseName("screen_4_line_1")}
									wordPoses={wordPoses}
									className="word"
								>
									FOLLOW MY PROGRESS ON SOCIAL MEDIA:
								</SplitText>
							</div>

							<div className="text_line text_line_2 of medium_text_line">
								<SplitText
									pose={this.getPoseName("screen_4_line_2")}
									wordPoses={wordPoses}
									className="word"
								>
									YOUTUBE.COM/DCDNT
								</SplitText>
							</div>

							<div className="text_line text_line_3 of medium_text_line">
								<SplitText
									pose={this.getPoseName("screen_4_line_3")}
									wordPoses={wordPoses}
									className="word"
								>
									INSTAGRAM.COM/DCDNT
								</SplitText>
							</div>

							<div className="text_line text_line_3 of medium_text_line">
								<SplitText
									pose={this.getPoseName("screen_4_line_4")}
									wordPoses={wordPoses}
									className="word"
								>
									FACEBOOK.COM/DCDNTMUSIC
								</SplitText>
							</div>

							<div className="screen_4_bottom">
								<div className="screen_4_bottom_line_container">
									<Line
										pose={this.getPoseName("screen_4_bottom_line")}
										className="screen_4_bottom_line"
									/>
								</div>

								<div className="screen_4_bottom_dcdnt">
									<div className="of">
										<SplitText
											pose={this.getPoseName("screen_4_bottom_dcdnt")}
											wordPoses={wordPoses}
											className="word"
										>
											DCDNT – NEW YORK CITY, 2019
										</SplitText>
									</div>
								</div>
							</div>
						</div>

						<div className="video-footer">
							<div className="left-label">
								<div className="of">
									<SplitText
										pose={this.getPoseName("left_label")}
										wordPoses={BottomLabelPoses}
										className="label"
										onPoseComplete={(pose)=> {
												if(pose == "enter") {
													this.setState({ line_visible: true })
												}
											}
										}
									>
										NEW YORK CITY, ASTORIA
									</SplitText>
								</div>
							</div>

							<div className="line-container">
								<Line
									pose={this.getPoseName("line")}
									className="line"
									onPoseComplete={(pose)=> {
										if(pose == "enter") {
											this.setState({ right_label_visible: true })
										}
										}
									}
								/>
							</div>

							<div className="right-label">
								<div className="of">
									<SplitText
										pose={this.getPoseName("right_label")}
										wordPoses={BottomLabelPoses}
										className="label"
										onPoseComplete={(pose)=> {
												if(pose == "enter") {
													this.setState({ line_visible: true })
												}
											}
										}
									>
										DECEMBER 22, 2018
									</SplitText>
								</div>
							</div>
						</div>
					</div>
					<div className="jam-visualization">
						{this.state.viz_visible && <VizDiv
							initialPose="exit"
							pose={this.getPoseName('viz')}
							className="viz"
						>
							<Viz/>
						</VizDiv>}

						<Viz/>

						{/* <VizDiv
							initialPose="exit"
							pose={this.getPoseName('viz')}
							className="viz"
						>
							<Viz/>
						</VizDiv> */}

						{/* <Viz/> */}

						
						
					</div>
					<div 
						className={classNames({"full": this.props.fullScreen}, "jam-bottom-container")}

					>
						<Timeline />

						<div 
							className="jam-sections-container"
						>
							<AudioSettings onAudioUpdate={(sound) => this.updateJamAudio(sound)}/>
							<MetadataSettings onMetadataUpdate={(metadata) => this.updateJamMetadata(metadata)} />
							<VizSettings
								onVizUpdate={(viz) => this.updateJamViz(viz)}
								saveViz={(viz) => this.saveViz(viz)}
							/>
						</div>

						<JamToolbar />
					</div>
				</div>
      </div>
		);
	}
}

function mapStateToProps(state) {
	return {
    	currentJam: state.jams.currentJam,
		viz: state.viz,
		fullScreen: state.app.fullScreen
	};
}

export default {
	component: connect(mapStateToProps, {
    loadJam,
    clearCurrentJam,
		updateJam,
		changeVizSettings
  })(JamPage)
}
