import React, { Component } from "react";
import { Field, reduxForm, formValueSelector, change } from "redux-form";
import classnames from "classnames";
import { Form } from "redux-form";
import { connect, actions } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@blueprintjs/core";

import Input from "../../components/form/Input";
import Slider from "../../components/form/Slider";

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
							ref="boldRate"
							min={0}
							max={20}
						/>
						<Field
							name="step"
							component={Slider}
							label="step"
							ref="step"
							min={0}
							max={20}
						/>
						<Field
							name="rotateSpeed"
							component={Slider}
							label="rotateSpeed"
							ref="rotateSpeed"
							min={0}
							max={20}
						/>
						<Field
							name="frequency"
							component={Slider}
							label="frequency"
							ref="frequency"
							min={0}
							max={20}
						/>

						<Field
							name="friction"
							component={Slider}
							label="friction"
							ref="friction"
							min={0}
							max={1}
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
