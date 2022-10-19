import { Document, Model } from "mongoose";
import {IReservation} from "modules/reservation/reservation.interface"
import { IBike } from "modules/bike/bike.interface";
import { IUser } from "modules/user/user.interface";

export interface IRating extends Document{
    bike_id: IBike,
    user_id: IUser,
    reservation_id: IReservation,
    rate: number,
}

export interface IRatingModel extends Model<IRating>{}