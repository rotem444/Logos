import _ from "lodash";

export const connectives = ["∧", "∨", "⇒", "⇔", "¬"];
export const letters = ["P", "Q", "R", "S", "T", "(", ")"];
export const greekLetters = ["δ", "φ", "ψ"];

const brk = /\([^\(]+?\)/g;
const wwf = /\([A-Z][∧∨⇒⇔][A-Z]\)|[A-Z]¬+/g;

export const toArgFormat = ({ premises, conclusion }) =>
  `${premises.join(", ")} ⊢ ${conclusion}`;

export const isWWF = (formula) =>
  wwf.test(formula)
    ? isWWF(formula.replace(wwf, "P"))
    : /^[A-Z]([∧∨⇒⇔][A-Z])?$/g.test(formula);

export const comparisonProp = (prop1, prop2) =>
  sortProp(prop1) === sortProp(prop2);

const rankProp = (prop) => {
  prop = cleanBrackets(prop);
  let connective = findMainConnective(prop);
  if (/^[A-Z]$/.test(connective)) {
    return connective.charCodeAt(0) - 64;
  }
  return 91 + [",", ...greekLetters, "¬", ...connectives].indexOf(connective);
};

export const sortProp = (prop) => {
  if (prop.length === 1) return prop;
  if (hasUnnesseryBrackets(prop)) return `(${sortProp(prop.slice(1, -1))})`;
  let { connective, props } = splitProp(prop);
  if (connective === "¬") return sortProp(props[0]) + "¬";
  if ("∧∨⇔".includes(connective)) props.sort();
  return props.map(sortProp).join(connective);
};
const hasUnnesseryBrackets = (prop) =>
  brk.test(prop) ? hasUnnesseryBrackets(prop.replace(brk, "")) : !prop;

export const cleanBrackets = (prop) =>
  hasUnnesseryBrackets(prop) ? prop.slice(1, -1) : prop;

export const addBracket = (prop) =>
  _.initial(connectives).includes(findMainConnective(prop))
    ? `(${prop})`
    : prop;

export const findMainIndex = (prop) =>
  brk.test(prop)
    ? findMainIndex(prop.replace(brk, (sub) => "_".repeat(sub.length)))
    : prop.search(/[∧∨⇒⇔]|.$/);

export const findMainConnective = (prop) => prop[findMainIndex(prop)];

export const splitProp = (prop) => {
  if (prop.includes(", ")) {
    return { connective: ",", props: prop.split(", ") };
  }
  let idx = findMainIndex(prop);
  let connective = prop[idx];
  let props = [prop.slice(0, idx)];
  if (connective !== "¬") props.push(prop.slice(idx + 1));
  return {
    connective,
    props,
  };
};
const unionDicts = (dicts) => {
  let union = {};
  for (let dict of dicts) {
    if (_.isNil(dict)) return null;
    for (let [key, val] of _.entries(dict)) {
      if (!(key in union)) union[key] = val;
      else if (!comparisonProp(union[key], val)) return null;
    }
  }

  return union;
};
const getDict = (prop, schema) => {
  if (prop === null) return null;
  [prop, schema] = [prop, schema].map(cleanBrackets);
  if (greekLetters.includes(schema)) {
    return { [schema]: sortProp(prop) };
  }

  let [
    { connective, props },
    { connective: schemaConnective, props: schemaProps },
  ] = [prop, schema].map(splitProp);

  if (connective !== schemaConnective) {
    return null;
  }

  let dicts = unionDicts(
    _.zip(props, schemaProps).map(([p, s]) => getDict(p, s))
  );

  if (_.isNil(dicts) && "∧∨⇔".includes(connective)) {
    dicts = unionDicts(
      _.zip(props.reverse(), schemaProps).map(([p, s]) => getDict(p, s))
    );
  }
  return dicts;
};

export const getConclusion = (props, schemas, conclusion) => {
  console.log(props, schemas, conclusion);
  if (_.isNil(props) && _.isNil(schemas)) {
    return "@";
  }
  let dict = getDict(props.join(", "), schemas.join(", "));
  console.log(dict);
  //let dict = getDict(props, schemas.replace("...", ", "));
  if (!dict) return null;
  return conclusion.replace(/[δφψ]/g, (char, idx, str) => {
    let prop = dict[char] ?? "@";
    if (
      [str[idx - 1], str[idx + 1]].some((char) => connectives.includes(char))
    ) {
      prop = addBracket(prop);
    }
    return prop;
  });
};

const convertToJS = {
  "∧": "&&",
  "∨": "||",
  "⇒": "<=",
  "⇔": "==",
};
export const isProvable = (premises, conclusion) => {
  premises = premises.concat("P⇒P");
  // convert any connective to the parallel JavaScript operator
  let functionBody = `((${premises.join(")&&(")}))<=(${conclusion})`.replace(
    /[∧∨⇒⇔]/g,
    (connective) => convertToJS[connective]
  );
  // the '¬' connective need to be convert to the '!' operator and move from right to left
  while (functionBody.includes("¬")) {
    functionBody = functionBody.replace(/(\(.+\)|[A-Z])¬/g, "!$1");
  }
  let atomicProps = _.uniq([...functionBody.replace(/[^A-Z]/g, "")]);
  let trueTableFunc = new Function(...atomicProps, "return " + functionBody);
  let colLen = atomicProps.length;
  let rowLen = colLen ** 2;
  return _.range(rowLen).every((col) => {
    let bitwiseArr = [..._.pad(col.toString(2), colLen, "0")].map(_.parseInt);
    return trueTableFunc(...bitwiseArr);
  });
};
var users = [
  { user: "fred", age: 48 },
  { user: "barney", age: 36 },
  { user: "fred", age: 40 },
  { user: "barney", age: 34 },
];

console.log(90);
console.log(
  _.sortBy(users, [
    function (o) {
      return o.user;
    },
  ])
);
console.log(users);
