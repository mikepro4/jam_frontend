import React from "react";
import classNames from "classnames";

const Checkbox = ({
	input,
	label,
	meta: { touched, error }
}) => {
	let containerClassName = classNames({
		"checkbox-container": true,
		"input-valid": touched && !error,
		"input-invalid": touched && error
	});

	return (
		<div className={containerClassName}>

			<label className="checkbox-wrapper">
				<input {...input} checked={input.value} className="checkbox" type="checkbox" />
				<div className="checkbox-control" />
				{label ? <div className="input-label">{label}</div> : ""}
			</label>

			{touched && error ? (
				<div className="input-error">
					{touched && error && <span>{error}</span>}
				</div>
			) : ""}
		</div>
	);
};

export default Checkbox;
