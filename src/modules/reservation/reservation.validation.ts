import Joi from "joi";
import { ReservationStatus } from "./reservation.interface";

export const validateCreateReservation ={
    body: Joi.object({
        bike_id: Joi.string().required(),
        date_from: Joi.number().required(),
        date_to: Joi.number().required()
    })
}

export const validateUpdateReservation ={
    body: Joi.object({
        user_id: Joi.string(),
        bike_id: Joi.string(),
        date_from: Joi.number(),
        date_to: Joi.number(),
        status: Joi.string().valid(...Object.values(ReservationStatus))
    })
}