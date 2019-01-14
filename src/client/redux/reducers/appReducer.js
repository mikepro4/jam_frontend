import {
	FETCH_AUTH,
	TOGGLE_FULLSCREN
} from "../actions/types";

export const initialState = {
	user: null,
	fullScreen: false
};

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_FULLSCREN:
			return {
				...state,
				fullScreen: !state.fullScreen
			}
		case FETCH_AUTH:
			return {
				...state,
				user: action.payload
			}
		default:
			return state;
	}
};
