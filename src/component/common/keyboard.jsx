import React, { useState, useMemo } from "react";
import _ from "lodash";
import { connectives, letters } from "../../utilize/logicFunc";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  physicalKeyboardClick,
  virtualKeyboardClick,
} from "../eding/store/action";

export default function Keyboard({ dispatch, formula, actions, payload = [] }) {
  return (
    <div className="d-flex flex-column justify-content-center">
      <input
        className="form-control"
        type="text"
        value={formula}
        onChange={({ currentTarget: { value } }) => {
          dispatch(
            physicalKeyboardClick(
              value
                .toUpperCase()
                .replace(illegalChar, (char) => connectives[char - 1] ?? "")
            )
          );
        }}
      />

      <div className="container-sm container-fluid">
        <div className="row justify-content-center">
          {connectives.map((connective, idx) => (
            <div
              className="col position-relative btn btn-outline-info m-1"
              key={connective}
              id={connective}
              onClick={() => dispatch(virtualKeyboardClick(connective))}
            >
              <div
                className="position-absolute m-0"
                style={{ left: "0", top: "0" }}
              >
                {idx + 1}
              </div>
              <div>{connective}</div>
            </div>
          ))}
        </div>
        <div className="row justify-content-center">
          {letters.map((letter) => (
            <div
              className="col btn btn-outline-info m-1"
              key={letter}
              id={letter}
              onClick={() => dispatch(virtualKeyboardClick(letter))}
            >
              {letter}
            </div>
          ))}
        </div>
        <div className="row justify-content-center">
          {actions.map((action) => (
            <div
              key={action}
              className="col btn btn-outline-info m-1"
              onClick={() => dispatch(action(payload))}
            >
              {action().type.toLowerCase().replace("_", " ")}
            </div>
          ))}
          <div
            className="col-2 btn btn-outline-info m-1"
            onClick={() => {
              dispatch(physicalKeyboardClick(""));
            }}
          >
            clear
          </div>
        </div>
      </div>
    </div>
  );
}
const illegalChar = /[^∧∨⇒⇔¬A-Z\(\)]/g;

async function* myIter() {
  yield 4;
}

//["∧", "∨", "⇒", "⇔", "¬"]

/* onChange={({ currentTarget: { value } }) =>
          dispatch({
            type: "PHYSICAL_KEYBOARD_CHLICK",
            payload: value
              .toUpperCase()
              .replace(illegalChar, (char) => connectives[char - 1] ?? ""),
          })
        } */
