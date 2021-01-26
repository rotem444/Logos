import React from "react";
import { addFromPopup } from "../exercise/store/actions";

export default function Popup({ dispatch, options }) {
  return (
    <div className="container w-50 bg-info card mb-3">
      <h4 className="row justify-content-around text-light">
        choose betwin the option
      </h4>
      <div className="row justify-content-around text-light">
        {options.map((option) => (
          <button
            key={option}
            className="col-4 mb-3 btn btn-warning text-info"
            onClick={() => dispatch(addFromPopup(option))}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
