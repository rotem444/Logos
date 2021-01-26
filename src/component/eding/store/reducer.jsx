import { toast } from "react-toastify";
import _ from "lodash";
import { parse } from "query-string";
import * as act from "./actionType";
import { isWWF, isProvable } from "../../../utilize/logicFunc";

const wwfChack = (formula) => {
  if (isWWF(formula)) return false;
  toast.error("Formula is not Well-formed");
  return true;
};

export const init = (homework) => {
  return {
    lessonsIndex: _.cloneDeep(homework),
    premises: [],
    conclusion: "",
    marked: null,
    formula: "",
  };
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case act.PHYSICAL_KEYBOARD_CHLICK:
      return {
        ...state,
        formula: payload,
      };
    case act.VIRTUAL_KEYBOARD_CHLICK:
      return {
        ...state,
        formula: state.formula + payload,
      };
    case act.ADD_PREMISE:
      if (wwfChack(state.formula)) return state;
      return {
        ...state,
        premises: state.premises.concat(state.formula),
        formula: "",
        marked: null,
      };
    case act.REPLACE_PREMISE:
      toast(state.formula);
      if (wwfChack(state.formula)) return state;
      return {
        ...state,
        marked: null,
        formula: "",
        premises: state.premises.map((premise, idx) =>
          idx === (payload ?? state.marked) ? state.formula : premise
        ),
      };
    case act.DELETE_PREMISE:
      return {
        ...state,
        marked: null,
        premises: state.premises.filter((_, idx) => idx !== payload),
      };
    case act.MARKED_PREMISE:
      return {
        ...state,
        marked: payload === state.marked ? null : payload,
      };
    case act.SWITCH_PREMISES:
      return {
        ...state,
        marked: null,
        premises: state.premises.map((premise, idx) =>
          idx === state.marked
            ? state.premises[payload]
            : idx === payload
            ? state.premises[state.marked]
            : premise
        ),
      };
    case act.ADD_CONCLUSION:
      if (wwfChack(state.formula)) return { ...state };
      return {
        ...state,
        marked: null,
        formula: "",
        conclusion: state.formula,
      };
    case act.DELETE_CONCLUSION:
      return {
        ...state,
        conclusion: "",
      };
    case act.REPLACE_CONCLUSION:
      console.log(89);
      return {
        ...state,
        ...(!wwfChack(state.formula) && {
          marked: null,
          formula: "",
          conclusion: state.formula,
        }),
      };
    case act.ADD_ARGUMENT:
      if (!state.conclusion) {
        toast(`you can't send argument whitout conclusion`);
      } else if (!isProvable(state.premises, state.conclusion)) {
        toast("Unprovable argument");
      } else {
        var lessonsIndex = [...state.lessonsIndex];
        lessonsIndex[payload[0]] = (lessonsIndex[payload[0]] ?? []).concat(
          _.pick(state, ["premises", "conclusion"])
        );

        return {
          ...state,
          lessonsIndex,
          formula: "",
          premises: [],
          conclusion: "",
        };
      }

      return state;

    case act.REPLACE_ARGUMENT:
      if (!state.conclusion) {
        toast(`you can't send argument whitout conclusion`);
      } else if (!isProvable(state.premises, state.conclusion)) {
        toast("Unprovable argument");
      } else {
        var lessonsIndex = [...state.lessonsIndex];
        lessonsIndex[payload[0]] = [...lessonsIndex[payload[0]]];
        _.set(lessonsIndex, payload, _.pick(state, ["premises", "conclusion"]));

        return {
          ...state,
          lessonsIndex,
          formula: "",
          premises: [],
          conclusion: "",
        };
      }

      return state;

    case act.MARKED_ARGUMENT:
      return {
        ...state,
        ...payload,
      };
    case act.GO_TO_INDEX:
      return {
        ...state,
        lesson: null,
        exercise: null,
      };
    default:
      return state;
  }
};

/* case act.DELETE_PREMISE:
      return {
        ...state,
        marked: null,
        premises: state.premises.filter((_, idx) => idx !== payload),
      };
    case act.MARKED_PREMISE:
      return {}; */
