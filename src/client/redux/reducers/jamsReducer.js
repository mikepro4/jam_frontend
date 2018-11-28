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

export const initialState = {
  loading: false,
	currentJam: {},
  loadedJamsCollection: [],
  updateCollection: false,
  jamScreen: {
    audioSettingsVisible: false,
    jamMetadataVisible: false,
    vizSettingsVisible: false
  }
};

export const jamsReducer = (state = initialState, action) => {
	switch (action.type) {
    case SEARCH_JAMS:
			return {
				...state,
				loading: true,
        updateCollection: false
			}
    case SEARCH_JAMS_SUCCESS:
      return {
        ...state,
        loading: false,
        loadedJamsCollection: action.payload.all
      }
    case CREATE_JAM:
      return {
        ...state,
        loading: true,
      }
		case CREATE_JAM_SUCCESS:
			return {
				...state,
        loading: false,
        updateCollection: true
			}
    case DELETE_JAM:
      return {
        ...state,
        updateCollection: true
      }
    case LOAD_JAM_SUCCESS:
      return {
        ...state,
        currentJam: action.payload
      }
    case CLEAR_CURRENT_JAM:
      return {
        ...state,
        currentJam: {}
      };
    case TOGGLE_AUDIO_SETTINGS:
      return {
        ...state,
        jamScreen: {
          ...state.jamScreen,
          audioSettingsVisible: !state.jamScreen.audioSettingsVisible
        }
      };
    case TOGGLE_JAM_METADATA:
      return {
        ...state,
        jamScreen: {
          ...state.jamScreen,
          jamMetadataVisible: !state.jamScreen.jamMetadataVisible
        }
      };
    case TOGGLE_VIZ_SETTINGS:
      return {
        ...state,
        jamScreen: {
          ...state.jamScreen,
          vizSettingsVisible: !state.jamScreen.vizSettingsVisible
        }
      };
    case UPDATE_JAM:
      return {
        ...state,
        loading: true,
      }
    case UPDATE_JAM_SUCCESS:
      return {
        ...state,
        loading: false,
        currentJam: action.payload
      }
		default:
			return state;
	}
};
