import * as _ from "lodash";
import axios from "axios";

import {
	UPLOAD_AUDIO,
  UPLOAD_AUDIO_SUCCESS,
  UPLOAD_AUDIO_ERROR
} from "../actions/types";

// =============================================================================

export const uploadAudioFile = (file, success) => async (dispatch, getState, api) => {
	dispatch({
		type: UPLOAD_AUDIO,
		payload: file
	})

  const formData = new FormData();
  formData.append("file", file);

  axios.post(
    'http://localhost:5000/upload',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  ).then(response => {
    if (response.status === 200 && response.data) {
      dispatch({
    		type: UPLOAD_AUDIO_SUCCESS,
    		payload: response.data
    	})

      if(success) {
        success(response.data.result)
      }
    }
  }).catch(error => {
      console.log(error);
      dispatch({
    		type: UPLOAD_AUDIO_ERROR,
    		payload: error
    	})
  });
}
