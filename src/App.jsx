import React, { useReducer, useEffect, useMemo } from "react";
import _ from "lodash";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { reducer, init } from "./store/reducer";
import * as act from "./store/action";
import Navbar from "./component/Navbar";
import About from "./component/About";
import Help from "./component/Help";
import ExerciseRoute from "./component/exercise/Route";
import Eding from "./component/eding/Route";
import Tracking from "./component/StudentsTracking";

import LogOut from "./component/LogOut";
import SignUp from "./component/user/SignUp";
import SignIn from "./component/user/SignIn";
import "./App.css";

const URL = "https://logos123.herokuapp.com";
const Context = React.createContext({});

function App() {
  const location = useLocation();
  const { pathname, search } = location;
  const [{ loading, ...state }, dispatch] = useReducer(reducer, init(pathname));
  const { page, lesson, exercise, status } = state;

  const routes = {
    About,
    Guide: Help,
    Examples: ExerciseRoute,
    ...(status === "student" && { Homework: ExerciseRoute }),
    ...(status === "teacher" && { Eding, Tracking }),
    ...(status === "guest" ? { SignIn, SignUp } : { LogOut }),
  };
  const links = _.keys(routes);
  const history = useHistory();

  axios.defaults.headers.common["x-auth-token"] = useMemo(() => {
    return localStorage.getItem("token");
  }, [status]);
  useEffect(() => {
    if (!loading) return;
    axios
      .post(`${URL}/${state.path}`, state.body)
      .then(({ data: { message, token, ...data } }) => {
        if (token) localStorage.setItem("token", token);
        if (message) toast.success(message);
        if (page) history.replace(page);
        dispatch(act.success(data));
      })
      .catch((err) => {
        let messege = err?.response?.data;
        if (typeof messege !== "string") {
          messege = "unexpected error";
        }
        toast.error(messege);
        dispatch(act.failed());
      });
  }, [loading]);

  return (
    <div className="container-fluid p-0">
      <Context.Provider value={{ ...state, httpDispatch: dispatch }}>
        <Navbar navs={links} dispatch={dispatch} />
        <ToastContainer />
        <div className="container-fluid container-md text-info">
          <Switch>
            {_.map(routes, (Component, name) => (
              <Route
                key={name}
                component={Component}
                path={"/" + name.toLowerCase()}
              />
            ))}
            <Route path="*" component={About} />
          </Switch>
        </div>
      </Context.Provider>
    </div>
  );
}
//<h1>{_.capitalize(prop.location.pathname.slice(1))}</h1>
export { Context };

export default App;

function valid(fields) {
  return false;
}
