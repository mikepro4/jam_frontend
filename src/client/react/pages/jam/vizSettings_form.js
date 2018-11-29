import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import classnames from "classnames";
import { Form } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@blueprintjs/core";

import Input from "../../components/form/Input";

class VizSettingsForm extends Component {
	render() {
		const { handleSubmit } = this.props;

		return (
				<div className="viz-settings-form">
					<Form onSubmit={handleSubmit} autoComplete="off">
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