import * as act from "./actionType";

export const physicalKeyboardClick = (value) => ({
  type: act.PHYSICAL_KEYBOARD_CHLICK,
  info: "",
  payload: value,
});

export const virtualKeyboardClick = (char) => ({
  type: act.VIRTUAL_KEYBOARD_CHLICK,
  info: "",
  payload: char,
});

export const addPremise = () => ({
  type: act.ADD_PREMISE,
  info: "",
});

export const replacePremise = (idx) => ({
  type: act.REPLACE_PREMISE,
  info: "",
  payload: typeof idx === "number" ? idx : undefined,
});

export const deletePremise = (idx) => ({
  type: act.DELETE_PREMISE,
  info: "",
  payload: idx,
});

export const markedPremise = (idx) => ({
  type: act.MARKED_PREMISE,
  info: "",
  payload: idx,
});

export const switchPremises = (idx) => ({
  type: act.SWITCH_PREMISES,
  info: "",
  payload: idx,
});

export const addConclusion = () => ({
  type: act.ADD_CONCLUSION,
  info: "",
});
export const replaceConclusion = () => ({
  type: act.REPLACE_CONCLUSION,
  info: "",
});
export const deleteConclusion = () => ({
  type: act.DELETE_CONCLUSION,
  info: "",
});

export const addArgument = (payload) => ({
  type: act.ADD_ARGUMENT,
  info: "",
  payload,
});

export const replaceArgument = (payload) => ({
  type: act.REPLACE_ARGUMENT,
  info: "",
  payload,
});
export const markedArgument = (lesson, exercise) => ({
  type: act.MARKED_ARGUMENT,
  info: "",
  payload: { lesson, exercise },
});
export const goToIndex = () => ({
  type: act.GO_TO_INDEX,
  info: "",
});
