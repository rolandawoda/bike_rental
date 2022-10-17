import { NextFunction, Request, Response } from 'express'

import CustomError from '@utils/CustomError.class'
import Joi from 'joi'
import { pick } from '@utils/helpers'

const validate: (schema: Record<string, unknown>) => any = (schema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validSchema = pick(schema, ['params', 'query', 'body'])
  const object = pick(req, Object.keys(validSchema))
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object, {
      abortEarly: false
    })

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(', ')
    return next(new CustomError(401, errorMessage))
  }

  Object.assign(req, value)
  return next()
}

export default validate
