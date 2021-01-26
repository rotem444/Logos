import _ from "lodash";
import About from "./component/About";
import Help from "./component/Help";
import ExerciseRoute from "./component/routes/ExerciseRoute";
import EdingRoute from "./component/routes/EdingRoute";
import StudentsTracking from "./component/StudentsTracking";
import SignPages from "./component/SignPages";
import LogOut from "./component/LogOut";

const routes = [
  {
    component: About,
    path: "/",
    side: "left",
  },
  {
    component: Help,
    path: "/help",
    side: "left",
  },
  {
    component: ExerciseRoute,
    path: "/examples",
    side: "left",
  },
  {
    component: ExerciseRoute,

    path: "/homework",
    status: ["student"],
    side: "left",
  },
  {
    component: EdingRoute,

    path: "/eding",
    status: ["teacher"],
    side: "left",
  },
  {
    component: StudentsTracking,

    path: "/tracking",
    status: ["teacher"],
    side: "left",
  },
  {
    component: SignPages,
    name: "Sign-UP",
    path: "/signup",
    status: ["guest"],
    side: "right",
  },
  {
    component: SignPages,

    path: "/signIn",
    status: ["guest"],
    side: "right",
  },
  {
    component: LogOut,
    path: "/logOut",
    status: ["student", "teacher"],
    side: "right",
  },
].map((route, idx) => ({
  ...route,
  name: idx ? _.capitalize(route.path.slice(1)) : "About",
  exact: !idx,
}));

export default routes;
