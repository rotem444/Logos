import React, { useReducer, useEffect, useContext } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { goToIndex } from "./store/action";
import CreateExerises from "./Create";
import Index from "./Index";
import _ from "lodash";
import { parse } from "query-string";
import { Context } from "../../App";
import { reducer, init } from "./store/reducer";

export default function EdingRoute({ location: { search }, history }) {
  const { homework } = useContext(Context);
  const [state, dispatch] = useReducer(reducer, homework, init);
  const { lessonsIndex } = state;
  useEffect(() => {
    history.push("/eding");
  }, [lessonsIndex]);

  const { lesson, exercise } = parse(search, { parseNumbers: true });
  if (_.isNil(lesson) && _.isNil(exercise)) {
    return <Index {...{ lessonsIndex, history }} />;
  }
  if (
    lessonsIndex.length > lesson &&
    lesson <= 0 &&
    lessonsIndex[lesson].length > exercise &&
    exercise <= 0
  ) {
    return <Redirect to="/eding" />;
  }
  return (
    <CreateExerises {...{ ...state, dispatch, lesson, exercise, history }} />
  );
}
