import {
	FETCH_AUTH
} from "../actions/types";

export const initialState = {
	user: null
};

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_AUTH:
			return {
				...state,
				user: action.payload
			}
		default:
			return state;
	}
};
