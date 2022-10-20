import Joi from "joi";
export const validateCreateRating ={
    body: Joi.object({
        bike_id: Joi.string().required(),
        reservation_id: Joi.string().required(),
        rate: Joi.number().required(),
    })
}