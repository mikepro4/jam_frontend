import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import qs from "qs";
import * as _ from "lodash";
import classNames from "classnames";
import Dropzone from "react-dropzone";
import axios from "axios";

import {
	uploadAudioFile
} from '../../../redux/actions/fileUploadActions'

class AudioUploader extends Component {
	state = {
	};

	handleDrop = files => {
    this.props.uploadAudioFile(files[0])
	};

	render() {
		return (
			<Dropzone
				onDrop={this.handleDrop}
				className="audio-upload-container"
			>
        <div className="audio-upload-button">
          upload file
        </div>
			</Dropzone>
		);
	}
}

const mapStateToProps = state => ({
});

export default withRouter(connect(mapStateToProps, {
  uploadAudioFile
})(AudioUploader));
