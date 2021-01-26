import * as act from "./types";

export const add = () => ({
  type: act.ADD,
  info: "",
});

export const addFromPopup = (option) => ({
  type: act.ADD_FROM_POPUP,
  info: "",
  payload: option,
});

export const markedProp = (idx) => ({
  type: act.MARKED_PROP,
  info: "",
  payload: idx,
});

export const inference = (newLine) => ({
  type: act.INFERENCE,
  info: "",
  payload: newLine,
});

export const goBack = () => ({
  type: act.GO_BACK,
  info: "",
});

export const finish = () => ({
  type: act.FINISH,
  info: "",
});
