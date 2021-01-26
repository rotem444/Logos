import Joi from "joi-browser";

let schema = {
  email: Joi.string().required().email().label("Email"),
  password: Joi.string().required().min(6).label("Password"),
  name: Joi.string().required().min(2).label("Name"),
  teacherEmail: Joi.string().required().email().label("Email"),
};

export const init = (isSignUp) => ({
  ...(isSignUp && {
    name: {
      value: "",
      error: "",
    },
  }),
  email: {
    value: "",
    error: "",
  },

  password: {
    value: "",
    error: "",
  },
  ...(isSignUp && {
    teacherEmail: {
      value: "",
      error: "",
    },
    status: "student",
  }),
});


export const reducer = (state, { target: { value, id, name } }) => {
  return {
    ...state,
    ...{
      [name]:
        name === "status"
          ? id
          : {
              value,
              error:
                Joi.validate(value, schema[id])?.error?.details?.[0]?.message ??
                null,
            },
    },
  };
};
