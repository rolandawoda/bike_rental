import Joi from 'joi';

export const validateCreateBike = {
    body: Joi.object({
        bike_model: Joi.string().required(),
        color: Joi.string().required(),
        location: Joi.object().keys({
            type: Joi.string(),
            longitude: Joi.string().required(),
            latitude: Joi.string().required(),
        })       
    })
}