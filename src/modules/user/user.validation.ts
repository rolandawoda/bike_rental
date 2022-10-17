import Joi from "joi";

export const validateUserCreation = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }).required(),
    password: Joi.string().min(5).required(),
  }),
};

export const validateUserLogin = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export const validateUpdateUser = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  }),
};
