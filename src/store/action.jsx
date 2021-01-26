import * as act from "./typs";

export const browse = (page = null) => ({
  type: act.BROWSE,
  info: "",
  payload: page,
});

export const putQueryStr = (lesson = null, exercise = null) => ({
  type: act.PUT_QUERY_STR,
  info: "",
  payload: { lesson, exercise },
});

export const request = (path, body, page = null) => ({
  type: act.REQUEST,
  info: "",
  payload: { path, body, page },
});

export const success = (data) => ({
  type: act.SUCCESS,
  info: "",
  payload: data,
});

export const failed = () => ({
  type: act.FAILED,
  info: "",
});

export const logOut = () => ({
  type: act.LOG_OUT,
  info: "",
});
