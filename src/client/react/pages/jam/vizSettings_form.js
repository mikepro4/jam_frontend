import React, { Component } from "react";
import { Field, reduxForm, formValueSelector, change } from "redux-form";
import classnames from "classnames";
import { Form } from "redux-form";
import { connect, actions } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@blueprintjs/core";

import Input from "../../components/form/Input";
import Slider from "../../components/form/Slider";

const normalizeNum= (value, previousValue) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
	return onlyNums
}

class VizSettingsForm extends Component {
	render() {
		const { handleSubmit } = this.props;

		return (
				<div className="viz-settings-form">
					<Form onSubmit={handleSubmit} autoComplete="off">

						<Field
							name="boldRate"
							component={Slider}
							label="Bold rate"
							normalize={normalizeNum}
							sliderMax={20}
						/>
						<Field
							name="step"
							component={Slider}
							label="step"
							normalize={normalizeNum}
							sliderMax={20}
						/>
						<Field
							name="rotateSpeed"
							component={Slider}
							label="rotateSpeed"
							normalize={normalizeNum}
							sliderMax={20}
						/>
						<Field
							name="frequency"
							component={Slider}
							label="frequency"
							normalize={normalizeNum}
							sliderMax={20}
						/>

						<Field
							name="friction"
							component={Slider}
							label="friction"
							normalize={normalizeNum}
							sliderMax={1}
						/>

						<Field
							name="rotatePointSpeed"
							component={Slider}
							label="rotatePointSpeed"
							normalize={normalizeNum}
							sliderMax={10}
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
