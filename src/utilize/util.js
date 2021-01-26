import _ from "lodash";

const inter = (prop, schema) => {
  let dict = {};
  let [premises, conc] = schema.split(" ⊢ ");
  premises = premises.split(", ");
};
