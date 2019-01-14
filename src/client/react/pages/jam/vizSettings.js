import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import posed, { PoseGroup } from 'react-pose';

import {
	changeVizSettings
} from '../../../redux/actions/vizActions'

import VizSettingsForm from './vizSettings_form'

class VizSettings extends Component {
	handleSubmit = values => {
		console.log(values)
		this.props.onVizUpdate(values)
	}

	savePng = () => {
		let c=document.getElementById("viz");
		let d=c.toDataURL("image/png");
		let w=window.open('about:blank','image from canvas');
		w.document.write("<img src='"+d+"' alt='from canvas'/>");
	}

	saveSvg = () => {
		//get svg element.
		var svg = document.getElementById("svgcanvas");
	
		//get svg source.
		var serializer = new XMLSerializer();
		var source = serializer.serializeToString(svg);
	
		//add name spaces.
		if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
			source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
		}
		if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
			source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
		}
	
		//add xml declaration
		source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
	
		//convert svg source to URI data scheme.
		var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
	
		//set url value to a element's href attribute.
		document.getElementById("link").href = url;
		//you can download svg file by right click menu.
	}

	render() {
    if(this.props.jamScreen.vizSettingsVisible && this.props.currentJam.defaultViz) {
      return (
        <div className="jam-section jam-viz-settings">
				<button onClick={this.savePng}>Save png</button>
				<button  onClick={() => this.saveSvg()}>Create Svg Link</button>
        		<a id="link">download svg</a>
       
					<VizSettingsForm
						ref="VizSettingsForm"
						enableReinitialize="true"
						initialValues={this.props.currentJam.defaultViz}
						onSubmit={values => {
							this.handleSubmit(values)
							this.props.saveViz(values)
						}}
						onChange={values => {
							this.handleSubmit(values)
						}}
					/>
				</div>
  		);
    } else {
      return ""
    }
	}
}

function mapStateToProps(state) {
	return {
		user: state.app.user,
		location: state.router.location,
    jamScreen: state.jams.jamScreen,
    currentJam: state.jams.currentJam
	};
}

export default connect(mapStateToProps, {
	changeVizSettings
})(withRouter(VizSettings));
