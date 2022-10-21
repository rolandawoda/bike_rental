import { IGetMangerInfoRequest, IGetUserInfoRequest } from "@middlewares/authentication";
import catchError from "@utils/catchError";
import bikeService from "modules/bike/bike.service";
import { ReservationStatus } from "./reservation.interface";
import reservationService from "./reservation.service";

const getReservations = catchError(async(req, res) => {
  let filter = {}
  let params = req.query
  if(params.user_id) filter["user_id"] = params.user_id
  if(params.bike_id) filter["bike_id"] = params.bike_id

  let reservations = await reservationService.getReservations(filter)

    res.status(200).json({
        status: "success",
        message: "Reservation",
        data: {
          reservations,
        },
      });
})
const getReservation = catchError(async(req, res) => {
    let reservation = await reservationService.getReservation(req.params.id)

    res.status(200).json({
        status: "success",
        message: "Reservation",
        data: {
          reservation,
        },
      });
})

const getUserReservation = catchError(async(req:IGetUserInfoRequest, res) =>{
    let reservations = await reservationService.getReservations({user_id:req.userID})
    res.status(200).json({
        status: "success",
        message: "Reservation",
        data: {
          reservations,
        },
      });
})
const createReservation = catchError(async (req:IGetUserInfoRequest, res) =>{
    const data = {...req.body, user_id:req.userID}

    // check if reservation with bike_id and user_id and status pending
    if(await reservationService.reservationExists({user_id:req.userID, bike_id:data.bike_id, status: ReservationStatus.PENDING})){
      return  res.status(200).json({
          status: "success",
          message: "You have a pending reservation for this bike",
        });
    }

    const reservation = await reservationService.createReservation(data)
    res.status(200).json({
      status: "success",
      message: "Reservation created successful",
    });
})

const updateReservation = catchError(async(req:IGetUserInfoRequest, res) =>{
    const data = {...req.body, user_id:req.userID}

    if(data.status && !(data.status !== ReservationStatus.CANCELLED || data.status !== ReservationStatus.COMPLETED)){
      return res.status(400).json({
         status: "error",
         message: "User Reservation status must be CANCELLED or COMPLETED",
         data: {}
       });
     }

     let reservation = await reservationService.getReservation(req.params.id)
     reservation =  await reservationService.updateReservation(reservation._id, data)

    // update bike availability
    if(data.status && data.status === ReservationStatus.CANCELLED){
      let bike_id = reservation.bike_id  as any
      let bike = await bikeService.getBike(bike_id)
      bike.available = true
      await bikeService.updateBike(bike_id, bike)
    }

    res.status(200).json({
      status: "success",
      message: "Reservation updated successful",
      data: {reservation}
    });
})

const managerUpdateReservation = catchError(async(req:IGetMangerInfoRequest, res) =>{
    const data = {...req.body}
    const reservation = await reservationService.updateReservation(req.params.id, data)
    // update bike availability
    let bike_id = reservation.bike_id  as any
    let bike = await bikeService.getBike(bike_id)
    if(data.status && data.status === ReservationStatus.APPROVED){
      bike.available = false
    }else if(data.status && data.status === ReservationStatus.COMPLETED ){
      bike.available = true
    }
    await bikeService.updateBike(bike_id, bike)

    res.status(200).json({
      status: "success",
      message: "Reservation updated successful",
      data: {reservation}
    });
})

export {
    getReservations, getReservation, createReservation, getUserReservation, updateReservation, managerUpdateReservation
}