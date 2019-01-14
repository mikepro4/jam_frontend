import * as _ from "lodash";
import axios from "axios";

import {
	FETCH_AUTH,
	TOGGLE_FULLSCREN
} from "../actions/types";

// =============================================================================

export const toggleFullScreenVisualization = () => async (dispatch, getState, api) => {
	dispatch({
		type: TOGGLE_FULLSCREN
	})
}

export const fetchCurrentUser = () => async (dispatch, getState, api) => {
	const res = await api.get("current_user");

	dispatch({
		type: FETCH_AUTH,
		payload: res.data
	})
}
