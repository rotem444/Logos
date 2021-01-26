import _, { initial } from "lodash";
import { rest } from "lodash";
import { toast } from "react-toastify";
import { string } from "yup";
import {
  splitProp,
  sortProp,
  cleanBrackets,
  findMainConnective,
  connectives,
  addBracket,
  getConclusion,
} from "../../../utilize/logicFunc";
import rules from "../../prof/prof.json";
//["∧", "∨", "⇒", "⇔", "¬"]

export const init = (premises) => ({
  prof: premises.map((premise) => ({
    proposition: premise,
    rationale: "Prem",
    indentation: 0,
    isMarked: false,
  })),
  model: null,
  isFinish: false,
});

export function reducer(state, { type, payload }) {
  switch (type) {
    case "MARK":
      return {
        ...state,
        prof: state.prof.map((line, idx) =>
          idx === payload ? { ...line, isMarked: !line.isMarked } : line
        ),
        model: null,
      };
    case "ADD":
      return {
        ...state,
        prof: state.prof.concat({
          ...state.model,
          proposition: state.model.rationale.startsWith("I∨")
            ? state.model.proposition.replace("@", addBracket(payload))
            : payload,
        }),
        model: null,
      };
    case "RULE":
      return { ...state, ...payload };
    case "COMPLETED":
      return {
        ...state,
        isFinish: true,
      };

    default:
      return state;
  }
}

/* function interfere({ prof }, rule) {
  let { schema, pattern, replacement } = rules[rule];
  let [premises, conclusion] = schema.split(" ⊢ ");
  premises = premises.split(", ");

  let mainConnectiv = premises
    .filter((str) => str.length !== 1)
    .map(findMainConnective);
  let { indentation, isMarked } = _.last(prof) ?? {};
  //get marked prop
  let markedProps = _.compact(
    prof.map(({ isMarked, ...rest }, idx) => isMarked && { ...rest, idx })
  );
  //props number chack
  let marked = premises.length;
  let markedLen = markedProps.length;
  let s = marked === 1 ? "" : "s";
  if (markedLen !== marked) {
    return `for ${rule} you need to marked ${marked} proposition${s}, instead, you mark ${markedLen}`;
  }

  //bloack cheack
  let index = markedProps[0]?.idx;
  let { indentation } = rule === "Rep" ? markedProps[0] : _.last(prof);
  if (
    prof
      .slice(index)
      .some(({ isMarked, indentation: intde }) =>
        isMarked ? indentation !== intde : indentation < intde
      )
  ) {
    return "GGGG";
  }
  if (
    rule !== "Hyp" &&
    prof
      .slice(index, -1)
      .some(({ isMarked, indentation: intde }) =>
        isMarked ? indentation !== intde : indentation < intde
      )
  ) {
    return "you marked the wong bloack";
  }

  //chacking from down init
  let firstRatio = markedProps[0]?.rationale;
  if (schema.includes("...")) {
    if (firstRatio !== "Hyp") {
      return `for ${rule}, the rational of the first proposition thet you mark need to be 'Hyp' in you'r proposition is '${firstRatio}'`;
    }
    if (isMarked) {
      return `for ${rule} you need to mark the last proposition`;
    }
    indentation--;
  }

  //main conectiv chack
  let restConc = markedProps.map(
    ({ proposition }) => splitProp(proposition).connective
  );
  if (_.difference(mainConnectiv, restConc).length) {
    return `for ${rule} you need to marked proposition${s} whit main conective${s}: '${mainConnectiv.join(
      `', '`
    )}', instead, you marked '${restConc.join(", ")}'`;
  }

  //sorting
  if (rule === "I∨") {
    _.sortBy(
      markedProps,
      ({ proposition }) => splitProp(proposition).connective === "∨"
    );
  }
  if (rule === "E⇒") {
    _.sortBy(markedProps, ({ proposition }) => proposition.length);
  }
  //pattern chack
  pattern = new RegExp(pattern, "g");
  let str = markedProps
    .map(({ proposition }) => sortProp(proposition))
    .join(", ");

  if (!pattern.test(str)) {
    return `for ${rule} you need to marked propositions thet match to the schem ${schema}`;
  }

  //ading

  let proposition = str
    .replace(pattern, replacement)
    .replace(/\[.+?\]/g, (sub, _, str) => {
      return (sub === str || str.includes(",")
        ? cleanBrackets
        : addBracket
      ).call(null, sub.slice(1, -1));
    });

  let isHyp = rule === "Hyp";
  let newLine = {
    proposition,
    rationale:
      rule + `(${markedProps.map(({ idx }) => idx + 1)})`.repeat(!isHyp),
    indentation: indentation + isHyp,
    isMarked: false,
  };
  prof = prof.map((line) => ({ ...line, isMarked: false }));
  if (/[,@]/.test(newLine.proposition)) {
    return {
      prof,
      model: newLine,
    };
  }
  return {
    prof: prof.concat(newLine),
    model: null,
  };
} */
