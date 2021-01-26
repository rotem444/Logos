import React, { useReducer, useContext } from "react";
import _ from "lodash";
import Input from "./Input";
import * as yup from "yup";
import { reducer, init } from "./store";
import { Context } from "../../App";
import { toast } from "react-toastify";
import { request } from "../../store/action";

export default function SignUp() {
  const { httpDispatch } = useContext(Context);
  const [{ status, ...fields }, dispatch] = useReducer(reducer, true, init);
  return (
    <form
      className="w-50"
      novalidate="novalidate"
      onSubmit={(e) => {
        e.preventDefault();
        let body = {};
        let err = [];
        let keys = _.keys(fields);
        if (status === "teacher") {
          keys = _.initial(keys);
        }

        for (let key of keys) {
          let { error, value } = fields[key];
          if (error) err.push(key);
          body[key] = value;
        }
        if (err.length) {
          let s = "s:".repeat(err.length !== 1);
          return toast(`Filde${s} "${err.join('", "')}" invalide.`);
        }
        console.log(body);
        httpDispatch(request("sign/up", body, "signin"));
      }}
    >
      <h1>Sign-Up</h1>
      <Input label="name" type="text" field={fields.name} dispatch={dispatch} />
      <Input label="email" field={fields.email} dispatch={dispatch} />
      <Input
        label="password"
        type="text"
        field={fields.password}
        dispatch={dispatch}
      />
      {["teacher", "student"].map((statusName) => (
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id={statusName}
            name="status"
            checked={statusName === status}
            onChange={dispatch}
          />
          <label className="form-check-label" for="flexRadioDefault1">
            {statusName}
          </label>
        </div>
      ))}
      {status === "student" && (
        <Input
          label="teacherEmail"
          type="text"
          field={fields.teacherEmail}
          dispatch={dispatch}
        />
      )}
      <button className="btn btn-outline-info mt-2 w-25">Submit</button>
    </form>
  );
}
