import CustomError from "@utils/CustomError.class";
import Bike from "modules/bike/bike.model";
import { IReservation } from "./reservation.interface";
import Reservation from "./reservation.model";

const getReservations:(filter:object) => Promise<IReservation[]> = async (filter)=>{
    return await Reservation.find(filter)
}

const getReservation:(id:string) => Promise<IReservation> = async (id) => {
    const reservation = await Reservation.findById(id)
    if (!reservation) throw new CustomError(404, "Reservation not found");
    return reservation;
}

const createReservation: (data:IReservation) => Promise<any> =async(data) =>{
    await Reservation.create(data)
}

const updateReservation: (id:string, data:IReservation) => Promise<IReservation> = async(id, data) =>{
    const reservation = await Reservation.findOneAndUpdate({ id }, data, {
        new: true,
      });
      if (!reservation) throw new CustomError(404, "Reservation not found");
    
      return reservation;
}

export default{
    getReservations, getReservation, createReservation, updateReservation
}