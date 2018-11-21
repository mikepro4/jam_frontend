import React from "react";
import App from "../App";
import Home from "../react/pages/home";
import MyJams from "../react/pages/myjams";

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
			}
		]
	}
];
