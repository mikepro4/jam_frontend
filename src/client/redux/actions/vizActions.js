import * as _ from "lodash";
import axios from "axios";

import {
	LOAD_SETTINGS,
  CHANGE_VIZ_SETTINGS
} from "../actions/types";


// =============================================================================

export const loadSettings = (vizSettings, jamId) => async (dispatch, getState, api) => {
  dispatch({
    type: LOAD_SETTINGS,
    vizSettings: vizSettings,
    jamId: jamId
  });
}

export const changeVizSettings = (vizSettings, jamId) => async (dispatch, getState, api) => {
  dispatch({
    type: CHANGE_VIZ_SETTINGS,
    vizSettings: vizSettings,
    jamId: jamId
  });
}
