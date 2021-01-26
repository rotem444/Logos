import React from "react";
import _ from "lodash";
import * as yup from "yup";

export default function Input({
  label,
  type = label,
  dispatch,
  field: { value, error },
}) {
  return (
    <div>
      <label htmlFor={label}>{_.startCase(label)}</label>

      <div className="input-group">
        <input
          className="form-control"
          type={type}
          value={value}
          name={label}
          id={label}
          onChange={dispatch}
        />
      </div>
      <div className="text-danger">{error}</div>
    </div>
  );
}
