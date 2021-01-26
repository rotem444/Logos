import React, { useContext } from "react";
import _ from "lodash";
import { parse } from "query-string";
import { Redirect, useLocation } from "react-router-dom";
import { Context } from "../../App";
import Prof from "./Prof";
import ExercisesIndex from "./Index";
import { browse, putQueryStr } from "../../store/action";

/* lesson: null,
        exercise: null */
export default function ExerciseRoute({
  location: { pathname, search },
  history,
}) {
  const { [pathname.slice(1).toLowerCase()]: lessons } = useContext(Context);
  if (!lessons) return <Redirect to="/About" />;
  let { lesson, exercise } = parse(search);
  if (_.isNil(lesson) && _.isNil(exercise)) {
    return (
      <ExercisesIndex lessons={lessons} history={history} pathname={pathname} />
    );
  }
  let prof = lessons?.[lesson - 1]?.[exercise - 1];
  if (!prof) return <Redirect to={`/${pathname}`} />;
  return <Prof {...prof} index={`${lesson}.${exercise}`} pathname={pathname}/>;
}

/* const title = pathname.slice(1);
const lessons = useContext(Context)[title];
if (!lessons) return <Redirect to="/" />;
const { lesson, exercise } = parse(search);
const prof = _.get(lessons, [lesson - 1, exercise - 1]);
if (search && !prof) return <Redirect to={pathname} />;

return search ? (
  <Prof {...prof} index={`${lesson}.${exercise}`} />
) : (
  <ExercisesIndex {...{ lessons, history, pathname }} />
); */
