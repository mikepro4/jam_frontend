import React, { Component } from "react";
import { Field, reduxForm, formValueSelector, change } from "redux-form";
import classnames from "classnames";
import { Form } from "redux-form";
import { connect, actions } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@blueprintjs/core";

import Input from "../../components/form/Input";
import Slider from "../../components/form/Slider";
import TabGroup from "../../components/form/TabGroup";
import ColorPicker from "../../components/form/ColorPicker";

class VizSettingsForm extends Component {
	render() {
		const { handleSubmit } = this.props;

		let mathTabOptions = [
			{
				value: "sin",
				name: "Sin"
			},
			{
				value: "cos",
				name: "Cos"
			},
			{
				value: "tan",
				name: "Tan"
			},
			{
				value: "atan",
				name: "Atan"
			},
			{
				value: "log",
				name: "Log"
			}
		]

		return (
				<div className="viz-settings-form">
					<Form onSubmit={handleSubmit} autoComplete="off">

						<Field
							name="shape.math"
							component={TabGroup}
							tabOptions={mathTabOptions}
							label="Math"
							sliderMax={20}
						/>

						<Field
							name="shape.boldRate"
							component={Slider}
							label="Bold rate"
							sliderMax={20}
						/>

						<Field
							name="shape.step"
							component={Slider}
							label="step"
							sliderMax={20}
						/>

						<Field
							name="shape.rotateSpeed"
							component={Slider}
							label="rotateSpeed"
							sliderMax={20}
						/>

						<Field
							name="shape.frequency"
							component={Slider}
							label="frequency"
							sliderMax={20}
						/>

						<Field
							name="shape.friction"
							component={Slider}
							label="friction"
							sliderMax={1}
						/>

						<Field
							name="shape.rotatePointSpeed"
							component={Slider}
							label="rotatePointSpeed"
							sliderMax={10}
						/>

						<Field
							name="point.pointSize"
							component={Slider}
							label="pointSize"
							sliderMax={20}
						/>

						<Field
							name="point.pointOpacity"
							component={Slider}
							label="pointOpacity"
							sliderMax={1}
						/>

						<Field
							name="point.pointColor"
							component={ColorPicker}
							label="pointColor"
						/>

						<Field
							name="background.backgroundColor"
							component={ColorPicker}
							label="backgroundColor"
						/>

		        <Button
							className="submit-button"
							loading={this.props.loading}
							type="submit"
							text="Save"
						/>

					</Form>
				</div>
		);
	}
}

const validate = values => {
	const errors = {};
	return errors;
};

VizSettingsForm = reduxForm({
	form: "viz_settings",
	validate,
})(VizSettingsForm);

VizSettingsForm = connect(state => {
	return {
	};
})(VizSettingsForm);

export default VizSettingsForm;
