import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import classnames from "classnames";
import { Form } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@blueprintjs/core";

import Input from "../../components/form/Input";

class MetadataSettingsForm extends Component {
	render() {
		const { handleSubmit } = this.props;

		return (
				<div className="metadata-settings-form">
					<Form onSubmit={handleSubmit} autoComplete="off">
		        <Field
		          name="artistName"
		          component={Input}
              label="Artist name"
		          placeholder="Type artist name..."
		          ref="artistName"
		        />

            <Field
		          name="trackName"
		          component={Input}
              label="Track Name"
		          placeholder="Type track name..."
		          ref="artistName"
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

MetadataSettingsForm = reduxForm({
	form: "metadata_settings",
	validate,
})(MetadataSettingsForm);

MetadataSettingsForm = connect(state => {
	return {
	};
})(MetadataSettingsForm);

export default MetadataSettingsForm;
