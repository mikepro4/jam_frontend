import React from "react";
import App from "../App";
import Home from "../react/pages/home";
import MyJams from "../react/pages/myjams";
import Jam from "../react/pages/jam";
import Profile from "../react/pages/profile";

export default [
	{
		...App,
		routes: [
			{
				...Home,
				path: "/",
				exact: true,
				params: {
					name: "home"
				}
			},
			{
				...MyJams,
				path: "/myjams",
				exact: true,
				params: {
					name: "myjams"
				}
			},
			{
				...Jam,
				path: "/jam/:jamId",
				exact: true,
				params: {
					name: "jam_page"
				}
			},
			{
				...Profile,
				path: "/profile/:profileId",
				exact: true,
				params: {
					name: "profile"
				}
			},
		]
	}
];
