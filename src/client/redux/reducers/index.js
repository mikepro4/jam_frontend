import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";
import { appReducer } from "./appReducer";
import { jamsReducer } from "./jamsReducer";
import { playerReducer } from "./playerReducer";

const REDUCERS_OBJECT = {
	app: appReducer,
	form: formReducer,
	jams: jamsReducer,
	player: playerReducer,
	router: routerReducer,
};

export default combineReducers(REDUCERS_OBJECT);
