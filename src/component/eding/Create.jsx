import React, { useState, useReducer } from "react";
import _ from "lodash";
import { BsArrowDown, BsArrowLeftRight } from "react-icons/bs";
import { VscTrash } from "react-icons/vsc";
import Keyboard from "../common/keyboard";
import * as act from "./store/action";

export default function CreateExerises({
  dispatch,
  premises,
  conclusion,
  marked,
  lessonsIndex,
  lesson,
  exercise,
  formula,
  history,
}) {
  return (
    <div>
      <Keyboard
        actions={[
          marked === null ? act.addPremise : act.replacePremise,
          !conclusion ? act.addConclusion : act.replaceConclusion,
          _.has(lessonsIndex, [lesson - 1, exercise - 1])
            ? act.replaceArgument
            : act.addArgument,
        ]}
        dispatch={dispatch}
        formula={formula}
        payload={[lesson - 1, exercise - 1]}
      />
      <h4 className="text-center" onClick={() => history.replace("/eding")}>
        replace exercise {exercise} in lesson {lesson}
      </h4>
      <div className="container-fluid">
        {premises.map((premise, idx) => (
          <div
            className={
              `row mb-2 align-items-center line` +
              " font-weight-bold".repeat(idx === marked)
            }
            style={{
              ...(idx === marked && { border: "0.1em solid black" }),
            }}
            onClick={() => dispatch(act.markedPremise(idx))}
            key={idx}
            draggable={true}
            onDragStart={() => dispatch(act.markedPremise(idx))}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => dispatch(act.switchPremises(idx))}
          >
            <div className="col-1 text-dark">{`${idx + 1}.`}</div>
            <div className="col-6 text-dark">{premise}</div>
            <div
              className="col-5 d-flex justify-content-end flex-fill text-dark"
              onClick={(e) => e.stopPropagation()}
            >
              {marked !== null && marked !== idx && (
                <div
                  className="myIcon"
                  onClick={() => dispatch(act.switchPremises(idx))}
                >
                  <BsArrowLeftRight />
                </div>
              )}
              <div
                className="myIcon"
                onClick={() => dispatch(act.replacePremise(idx))}
              >
                <BsArrowDown />
              </div>
              <div
                className="myIcon"
                onClick={() => dispatch(act.deletePremise(idx))}
              >
                <VscTrash />
              </div>
            </div>
          </div>
        ))}
        {conclusion && (
          <div className="row mb-2 align-items-center line">
            <div className="col-1 text-dark">⊢</div>
            <div className="col-8 text-dark">{conclusion}</div>
            <div className="col-3 d-flex justify-content-end">
              <div
                className="text-dark myIcon"
                onClick={() => dispatch(act.addConclusion())}
              >
                <BsArrowDown />
              </div>
              <div
                className="text-dark myIcon"
                onClick={() => dispatch(act.deleteConclusion())}
              >
                <VscTrash />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
