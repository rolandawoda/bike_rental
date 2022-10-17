import CustomError from "@utils/CustomError.class";
import { IReservation } from "./reservation.interface";
import Reservation from "./reservation.model";

const getReservations:(params:object) => Promise<IReservation[]> = async (params)=>{
    return await Reservation.find(params)
}

const getReservation:(id:string) => Promise<IReservation> = async (id) => {
    const reservation = await Reservation.findById(id)
    if (!reservation) throw new CustomError(404, "Reservation not found");
    return reservation;
}

const createReservation: (data:IReservation) => Promise<any> =async(data) =>{
    let save = await Reservation.create(data)
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