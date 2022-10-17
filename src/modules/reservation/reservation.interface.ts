import { IBike } from "modules/bike/bike.interface";
import { IUser } from "modules/user/user.interface";
import { Document, Model } from "mongoose";

export enum ReservationStatus{
    PENDING ="PENDING",
    CANCELLED ="CANCELLED",
    APPROVED ="APPROVED",
    REJECTED ="REJECTED",
    COMPLETED ="COMPLETED",
}
export interface IReservation extends Document{
    bike_id: IBike,
    user_id: IUser,
    date_from:string,
    date_to:string,
    status:ReservationStatus,
}

export interface IReservationModel extends Model<IReservation>{
    
}