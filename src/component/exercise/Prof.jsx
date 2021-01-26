import React, { useState, useEffect, useReducer, useContext } from "react";
import { RiArrowGoBackLine } from "react-icons/ri";
import _ from "lodash";
import Keboard from "../common/keyboard";
import { reducer, init } from "./store/reducer";
import * as act from "./store/actions";
import { request } from "../../store/action";

import {
  toArgFormat,
  findMainConnective,
  addBracket,
  comparisonProp,
} from "../../utilize/logicFunc";
import Popup from "../common/Popup";
import { Context } from "../../App";
import rules from "../../rules/inferenceRules";
import { toast } from "react-toastify";

export default function Prof({ premises, conclusion, _id, index, pathname }) {
  console.log(conclusion);
  const { httpDispatch, status } = useContext(Context);
  const [{ prof, model, isFinish, formula }, dispatch] = useReducer(
    reducer,
    premises,
    init
  );
  useEffect(() => {
    const { indentation, proposition } = _.last(prof);
    console.table({ proposition, conclusion });

    if (isFinish || indentation || !comparisonProp(proposition, conclusion)) {
      return;
    }
    dispatch(act.finish());
    toast.success(
      "bravo!!!" +
        " your anser send to the server".repeat(!!_id && status !== "guest")
    );
    if (_id && status !== "guest") {
      httpDispatch(request("completed", { _id, prof }));
    }
  }, [prof]);

  return (
    <>
      <h2>{pathname.slice(1).replace("s", "") + " " + index}</h2>
      <h3 className="text-success">
        {(isFinish && " finish") || (!_id && " exerises allredy finish")}
      </h3>
      <h4 className="text-center text-dark">
        {toArgFormat({ premises, conclusion })}
      </h4>
      {model &&
        (model.proposition.includes("@") ? (
          <Keboard dispatch={dispatch} actions={[act.add]} formula={formula} />
        ) : (
          <Popup dispatch={dispatch} options={model.proposition.split(", ")} />
        ))}
      <div className="container-fluid d-flex flex-row flex-md-nowrap flex-wrap">
        <table className="p-2 block table">
          <thead className="">
            <tr>
              <th
                scope="col"
                style={{ width: "15%" }}
                onClick={() => dispatch(act.goBack())}
              >
                <RiArrowGoBackLine />
              </th>
              <th scope="col" style={{ width: "70%" }}>
                proposition
              </th>
              <th scope="col">rationale</th>
            </tr>
          </thead>
          <tbody>
            {prof.map(
              ({ proposition, rationale, indentation, isMarked }, idx) => (
                <tr
                  key={idx}
                  style={{ cursor: "pointer" }}
                  className={"bg-info text-light".repeat(isMarked)}
                  onClick={() => dispatch(act.markedProp(idx))}
                >
                  <th scope="row">{`${idx + 1}.`}</th>
                  <td style={{ textIndent: `${indentation}em` }}>
                    {proposition}
                  </td>
                  <td>{rationale}</td>
                </tr>
              )
            )}
          </tbody>
        </table>

        <div
          className="d-flex flex-md-row flex-column flex-wrap m-0"
          style={{ flexShrink: "4", flexBasis: "100%", height: "200px" }}
        >
          {rules.map((rule) => (
            <div
              key={rule.name}
              style={{ width: "12%" }}
              className="btn btn-outline-info col-4 m-2 container d-flex align-items-center justify-content-center"
              title={rule.schema}
              onClick={() => {
                let newState = rule.interfer(prof);
                if (typeof newState === "string") {
                  return toast.error(newState);
                }
                dispatch(act.inference(newState));
              }}
            >
              <div>{rule.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
