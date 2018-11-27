import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";
import { appReducer } from "./appReducer";
import { jamsReducer } from "./jamsReducer";
import { playerReducer } from "./playerReducer";
import { vizReducer } from "./vizReducer";
import { fileUploadReducer } from "./fileUploadReducer";

const REDUCERS_OBJECT = {
	app: appReducer,
	form: formReducer,
	jams: jamsReducer,
	viz: vizReducer,
	player: playerReducer,
	fileUpload: fileUploadReducer,
	router: routerReducer,
};

export default combineReducers(REDUCERS_OBJECT);
