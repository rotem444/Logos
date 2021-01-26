import _ from "lodash";
import { toast } from "react-toastify";
import { parse } from "query-string";
import produce from "immer";
import examples from "./examples.json";
import axios from "axios";
import * as act from "./typs";

export const init = (location) => {
  return {
    loading: true,
    name: null,
    status: "guest",
    examples,
    homework: examples,
    page: window.location.pathname.slice(1),
    path: "entry",
    lesson: null,
    exercise: null,
    students: [
      ["Roni", "Roni123@gmail.com", 2],
      ["Shira", "Shira123@gmail.com", 2],
      ["Alon", "Alon123@gmail.com", 1],
    ],
  };
};

export const reducer = (state, { type, payload }) => {
  console.log(payload);
  switch (type) {
    case act.BROWSE:
      return {
        ...state,
        page: payload,
        lesson: null,
        exercise: null,
      };
    case act.PUT_QUERY_STR:
      return {
        ...state,
        ...payload,
      };
    case act.REQUEST:
      if (state.loading) {
        toast("The request has already been received");
        return state;
      }
      return {
        ...state,
        ...payload,
        loading: true,
      };
    case act.SUCCESS:
      let { path } = state;
      console.log("rtrt");
      console.log(payload);
      return {
        ...state,
        ...payload,
        loading: false,
        page: null,
      };
    case act.FAILED:
      return {
        ...state,
        loading: false,
        path: "",
      };
    case act.LOG_OUT:
      return {
        ...state,
        status: "guest",
        name: null,
        homework: null,
        teacherEmail: null,
      };

    default:
      break;
  }
};
