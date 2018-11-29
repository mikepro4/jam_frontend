import * as _ from "lodash";

import {
	LOAD_SETTINGS,
  CHANGE_VIZ_SETTINGS
} from "../actions/types";

export const initialState = {
	vizSettings: {},
	newVizSettings: null,
	jamId: null,
	newJamId: null
};

export const vizReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_SETTINGS: {
      return {
        ...state,
        vizSettings: action.vizSettings,
				jamId: action.jamId,
				newVizSettings: null,
				newJamId: null
      }
    }
		case CHANGE_VIZ_SETTINGS: {
			let shape = _.merge({}, state.vizSettings.shape, action.vizSettings.shape)
			let newVizSettings = {
				shape: shape,
				background: state.vizSettings.background,
				point: state.vizSettings.point
			}
      return {
        ...state,
				newVizSettings: newVizSettings,
				newJamId: action.jamId
      }
    }
		default:
			return state;
	}
};
