import * as _ from "lodash";
import axios from "axios";

import {
  SEARCH_JAMS,
  SEARCH_JAMS_SUCCESS,
  CREATE_JAM,
	CREATE_JAM_SUCCESS,
  DELETE_JAM,
  LOAD_JAM_SUCCESS,
  CLEAR_CURRENT_JAM,
  TOGGLE_AUDIO_SETTINGS,
  TOGGLE_JAM_METADATA,
  TOGGLE_VIZ_SETTINGS,
  UPDATE_JAM,
  UPDATE_JAM_SUCCESS
} from "../actions/types";

// =============================================================================

export const createJam = (metadata, success) => async (dispatch, getState, api) => {

  dispatch({
		type: CREATE_JAM
	});

	const res = await api.post("/jams/create", {
    metadata: metadata
  });

	dispatch({
		type: CREATE_JAM_SUCCESS,
		payload: res.data
	})

  if (success) {
		success(res.data);
	}
}

// =============================================================================

export const searchJams = (
	criteria,
	sortProperty,
	offset = 0,
	limit = 0,
	success
) => async (dispatch, getState, api) => {

	dispatch({
		type: SEARCH_JAMS
	});

	const response = await api.post("/jams/search", {
		criteria,
		sortProperty,
		offset,
		limit
	});

	dispatch({
		type: SEARCH_JAMS_SUCCESS,
		payload: response.data
	});

	if (response.data && success) {
		success();
	}
};

// =============================================================================

export const deleteJam = (jamId, success) => async (
	dispatch,
	getState,
	api
) => {

	const response = await api.post("/jams/delete", { jamId });
  if(response) {
    dispatch({
      type: DELETE_JAM
    });
  }
	if (success) {
		success(response.data);
	}
};

// =============================================================================

export const updateJam = (jamId, newJam, success) => async (
	dispatch,
	getState,
	api
) => {
  dispatch({
    type: UPDATE_JAM
  });

	const response = await api.post("/jams/update", {
		jamId,
		newJam
	});

  if(response) {
    dispatch({
      type: UPDATE_JAM_SUCCESS,
      payload: response.data.jam
    });
  }

	if (success) {
		success(response.data);
	}
};

// =============================================================================

export const loadJam = (jamId, success) => async (
	dispatch,
	getState,
	api
) => {

	const response = await api.post("/jams/details", { jamId });
  if(response) {
    dispatch({
      type: LOAD_JAM_SUCCESS,
      payload: response.data
    });
  }
	if (success) {
		success(response.data);
	}
};

// =============================================================================

export const clearCurrentJam = (success) => async (
	dispatch
) => {

  dispatch({
    type: CLEAR_CURRENT_JAM
  });

	if (success) {
		success(response.data);
	}
};

// =============================================================================

export const toggleAudioSettings = () => async (
	dispatch
) => {

  dispatch({
    type: TOGGLE_AUDIO_SETTINGS
  });
};

export const toggleJamMetadata = () => async (
	dispatch
) => {

  dispatch({
    type: TOGGLE_JAM_METADATA
  });
};

export const toggleVizSettings = () => async (
	dispatch
) => {

  dispatch({
    type: TOGGLE_VIZ_SETTINGS
  });
};
