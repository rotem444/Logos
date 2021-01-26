import React, { useReducer, useContext } from "react";
import Input from "./Input";
import { reducer, init } from "./store";
import { toast } from "react-toastify";
import { Context } from "../../App";
import { request } from "../../store/action";

export default function SignIn() {
  const { httpDispatch } = useContext(Context);
  const [{ status, ...fields }, dispatch] = useReducer(reducer, false, init);
  return (
    <form
      novalidate="novalidate"
      className="w-50"
      onSubmit={(e) => {
        e.preventDefault();
        let body = {};
        let err = [];
        for (let field in fields) {
          let { error, value } = fields[field];
          if (error || !value) err.push(field);
          body[field] = value;
        }
        if (err.length) {
          let s = "s:".repeat(err.length !== 1);
          return toast(`Filde${s} "${err.join('", "')}" invalide.`);
        }
        httpDispatch(request("sign/in", body));
      }}
    >
      <h1>Sing-In</h1>
      <Input label="email" field={fields.email} dispatch={dispatch} />
      <Input
        label="password"
        type="text"
        field={fields.password}
        dispatch={dispatch}
      />
      <button className="btn btn-outline-info mt-2 w-25">Submit</button>
    </form>
  );
}
