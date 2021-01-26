import React, { useState, useContext } from "react";
import { browse } from "../../store/action";
import { toArgFormat } from "../../utilize/logicFunc";

import { Context } from "../../App";

export default function ExercisesIndex({ lessons, history, pathname }) {
  const { dispatch } = useContext(Context);
  const [hoverExercise, setHoverExercise] = useState("");

  return (
    <>
      {" "}
      <h2>{pathname.slice(1)}</h2>
      <h3 style={{ height: "40px" }}>{hoverExercise}</h3>
      <table>
        <tbody onMouseLeave={() => setHoverExercise("")}>
          {lessons.map((lesson, idxLesson) => (
            <tr key={idxLesson + 1}>
              <th className="" onMouseEnter={() => setHoverExercise("")}>
                Lesson {idxLesson + 1}
              </th>{" "}
              {lesson.map(({ _id, ...arg }, idxExercise) => {
                return (
                  <td
                    key={`${idxLesson + 1}.${idxExercise + 1}`}
                    onClick={() =>
                      history.push(
                        `${pathname}?lesson=${idxLesson + 1}&exercise=${
                          idxExercise + 1
                        }`
                      )
                    }
                  >
                    <button
                      className={`btn btn-${_id ? "secondary" : "success"}`}
                      data-toggle="tooltip"
                      data-placement="top"
                      title={toArgFormat(arg)}
                      onMouseEnter={({ target: { title } }) =>
                        setHoverExercise(title)
                      }
                    >
                      {idxExercise + 1}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
