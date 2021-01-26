import _ from "lodash";
import * as act from "./types";
import {
  PHYSICAL_KEYBOARD_CHLICK,
  VIRTUAL_KEYBOARD_CHLICK,
} from "../../eding/store/actionType";
import { isWWF, addBracket, cleanBrackets } from "../../../utilize/logicFunc";
import { toast } from "react-toastify";

const wwfChack = (formula) => {
  if (isWWF(formula)) return false;
  toast.error("Formula is not Well-formed");
  return true;
};

//proposition, rationale, indentation, isMarked
export const init = (premises) => ({
  prof: premises.map((premise) => ({
    proposition: premise,
    rationale: "Prem",
    indentation: 0,
    isMarked: false,
  })),
  model: null,
  isFinish: false,
  formula: "",
});

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case PHYSICAL_KEYBOARD_CHLICK:
      return {
        ...state,
        formula: payload,
      };
    case VIRTUAL_KEYBOARD_CHLICK:
      return {
        ...state,
        formula: state.formula + payload,
      };
    case act.ADD:
      let { formula } = state;
      if (!isWWF(formula)) {
        toast.error("Formula is not Well-formed");
        return state;
      }
      if (state.model.rationale !== "Hyp") {
        formula = addBracket(formula);
      } else {
        formula = cleanBrackets(formula);
      }
      return {
        ...state,
        formula: "",
        model: null,
        prof: state.prof.concat({
          ...state.model,
          proposition: state.model.proposition.replace("@", formula),
        }),
      };
    case act.ADD_FROM_POPUP:
      console.log(payload);
      return {
        ...state,
        model: null,
        prof: state.prof.concat({
          ...state.model,
          proposition: payload,
        }),
      };
    case act.MARKED_PROP:
      return {
        ...state,
        model: null,
        prof: state.prof.map((prop, idx) =>
          idx === payload ? { ...prop, isMarked: !prop.isMarked } : prop
        ),
      };
    case act.INFERENCE:
      return {
        ...state,
        ...payload,
      };
    case act.GO_BACK:
      if (!state.prof.length || _.last(state.prof).rationale === "Prem") {
        toast("you can't go back anymor");
        return state;
      }
      return {
        ...state,
        model: null,
        prof: _.initial(state.prof),
      };
    case act.FINISH:
      return {
        ...state,
        isFinish: true,
      };

    default:
      return state;
  }
};
