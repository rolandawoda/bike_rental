import Joi from 'joi';

export const validateCreateManager = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    }),
    password: Joi.string().min(5).required(),
  })
}

export const validateLoginManager= {
  body: Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required()
  })
}

export const validateUpdateManager= {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    }),
    password: Joi.string().min(5)
  })
}


