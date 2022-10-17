import Joi from "joi";
import { ReservationStatus } from "./reservation.interface";

export const validateCreateReservation ={
    body: Joi.object({
        bike_id: Joi.string().required(),
        date_from: Joi.string().required(),
        date_to: Joi.string().required()
    })
}

export const validateUpdateReservation ={
    body: Joi.object({
        user_id: Joi.string(),
        bike_id: Joi.string(),
        date_from: Joi.string(),
        date_to: Joi.string(),
        status: Joi.string().valid(ReservationStatus)
    })
}