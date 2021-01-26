import React from "react";
import _, { split } from "lodash";
import {
  findMainConnective,
  findMainIndex,
  getConclusion,
  splitProp,
} from "../utilize/logicFunc";
import rules from "./rules.json";

class InferenceRules {
  constructor(name, { schema, info }) {
    let [premises, conclusion] = schema.split(" ⊢ ");
    this.name = name;
    this.schema = schema;
    this.info = info;
    this.premises = premises;
    this.conclusion = conclusion;
    this.indentationChange = (name === "Hyp") - schema.includes("...");
    premises = _.compact(premises.split(/, |\.\.\./g));
    this.len = premises.length;
    this.mainConnectives = premises
      .filter((str) => str.length !== 1)
      .map(findMainConnective);
  }
  lengthCheck(len) {
    if (this.len !== len) {
      let s = "s".repeat(this.len === 1);
      return `'${this.name}' run on ${this.len} proposition${s}, but you marked ${len}`;
    }
  }
  blockCheck(prof) {
    let idx = _.findIndex(prof, "isMarked");
    let { indentation: inde } = this.name === "Rep" ? prof[idx] : _.last(prof);
    if (
      prof
        .slice(idx)
        .some(({ indentation, isMarked }) =>
          isMarked ? indentation !== inde : indentation < inde
        )
    ) {
      return "wong bloack";
    }
  }
  mainConnectivesCheck(premises) {
    let mainConnectives = premises.map(findMainConnective);
    if (_.difference(this.mainConnectives, mainConnectives).length) {
      return `${
        this.name
      } run on propositions whit main conectives: '${this.mainConnectives.join(
        "' '"
      )}', you marked prop whit main conective ${mainConnectives.join(", ")}`;
    }
  }

  indentationDownChack(prof) {
    if (this.indentationChange !== -1) return;
    if (_.find(prof, "isMarked").rationale !== "Hyp") {
      return `for '${this.name}', the first proposition's rational need to be 'Hyp' .'`;
    }
    if (!_.last(prof).isMarked) {
      return `for '${this.name}, you need to mark the last proposition'`;
    }
  }

  sortPremises(markedProps) {
    console.log(this.name, markedProps);

    if (this.name === "E∨") {
      if (markedProps.length !== 3) {
        return markedProps;
      }
      markedProps.sort(
        ({ proposition: p1 }, { proposition: p2 }) =>
          +(findMainConnective(p1) === "∨" && findMainConnective(p2) !== "∨")
      );
      let main = +findMainIndex(markedProps[1].proposition);
      main = markedProps[1].proposition.slice(0, main);
      if (markedProps[0].proposition.endsWith(main)) {
        [markedProps[2], markedProps[1]] = [markedProps[1], markedProps[2]];
      }
      console.log(markedProps);
      return markedProps;
    }
    if (this.name === "E⇒") {
      return markedProps.sort(
        ({ proposition: p1 }, { proposition: p2 }) => p1.length - p2.length
      );
    }
    return markedProps;
  }

  interfer(prof) {
    let markedProps = this.sortPremises(
      _.compact(
        prof.map(
          ({ proposition, isMarked, ...rest }, idx) =>
            isMarked && { proposition, ...rest, idx }
        )
      )
    );

    let premises = _.map(markedProps, "proposition");

    let err =
      this.lengthCheck(markedProps.length) ??
      this.blockCheck(prof) ??
      this.mainConnectivesCheck(premises) ??
      this.indentationDownChack(prof);

    if (err) return err;
    console.log(premises, this.premises.split(/, |\.\.\./g), this.conclusion);
    let proposition =
      this.name === "Hyp"
        ? "@"
        : getConclusion(
            premises,
            this.premises.split(/, |\.\.\./g),
            this.conclusion
          );

    let newLine = {
      proposition,
      rationale:
        this.name +
        `(${markedProps.map(({ idx }) => idx + 1).join(", ")})`.repeat(
          this.name !== "Hyp"
        ),
      indentation: _.last(prof).indentation + this.indentationChange,
      isMarked: false,
    };

    prof = prof.map((line) => ({ ...line, isMarked: false }));
    if (/[,@]/.test(proposition)) {
      return { prof, model: newLine };
    }
    return {
      prof: prof.concat(newLine),
      model: null,
    };
  }
}

let arr = _.map(rules, (data, name) => new InferenceRules(name, data));
export default arr;
