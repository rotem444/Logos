import React, { useState, useContext } from "react";
import { toArgFormat } from "../../utilize/logicFunc";
import { Context } from "../../App";
import { request } from "../../store/action";

export default function EditingIndex({ lessonsIndex, history }) {
  const { httpDispatch } = useContext(Context);
  const [hoverExercise, setHoverExercise] = useState("");
  let len = lessonsIndex.length;
  return (
    <div className="container-fluid">
      <h2>Eding</h2>
      <h3 style={{ height: "40px" }}>{hoverExercise}</h3>
      {lessonsIndex.map((lesson, idx1) => {
        let len = lesson.length;
        return (
          <div key={`row${idx1}`} className="row">
            <div className="col-2">
              <div className="btn btn-info m-2"> lesson {idx1 + 1}:</div>
            </div>
            {lesson.map((arg, idx2) => (
              <button
                title={toArgFormat(arg)}
                key={`col${idx1}.${idx2}`}
                className="col-1 myButton"
                onClick={() =>
                  history.push(`eding?lesson=${idx1 + 1}&exercise=${idx2 + 1}`)
                }
                onMouseEnter={({ target: { title } }) =>
                  setHoverExercise(title)
                }
                onMouseLeave={() => setHoverExercise("")}
              >
                {idx2 + 1}
              </button>
            ))}
            {len !== 10 && (
              <div
                className="col-1 myButton text-dark d-flex align-items-center justify-content-center"
                style={{ borderRadius: "2em" }}
                onClick={() =>
                  history.push(`eding?lesson=${idx1 + 1}&exercise=${len + 1}`)
                }
              >
                +
              </div>
            )}
          </div>
        );
      })}
      {len !== 10 && (
        <div className="row">
          {" "}
          <div
            className="col-2"
            onClick={() => {
              history.push(`eding?lesson=${len + 1}&exercise=${1}`);
            }}
          >
            <div className="btn btn-info m-2 ml-4">+</div>
          </div>
        </div>
      )}
      <div className="row d-flex justify-content-center">
        <div
          className="btn btn-info col-3"
          onClick={() =>
            httpDispatch(request("eding", { lessons: lessonsIndex }))
          }
        >
          Submit
        </div>
      </div>
    </div>
  );
}
