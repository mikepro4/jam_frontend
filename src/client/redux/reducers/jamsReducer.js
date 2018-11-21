import {
  SEARCH_JAMS,
  SEARCH_JAMS_SUCCESS,
  CREATE_JAM,
	CREATE_JAM_SUCCESS,
  DELETE_JAM,
  LOAD_JAM_SUCCESS,
  CLEAR_CURRENT_JAM
} from "../actions/types";

export const initialState = {
  loading: false,
	currentJam: {},
  loadedJamsCollection: [],
  updateCollection: false
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
      }
		default:
			return state;
	}
};
