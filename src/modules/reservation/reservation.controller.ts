import { IGetMangerInfoRequest, IGetUserInfoRequest } from "@middlewares/authentication";
import catchError from "@utils/catchError";
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

    const reservation = await reservationService.createReservation(data)
    res.status(200).json({
      status: "success",
      message: "Reservation created successful",
    });
})

const updateReservation = catchError(async(req:IGetUserInfoRequest, res) =>{
    const data = {...req.body, user_id:req.userID}

    const reservation = await reservationService.updateReservation(req.params.id, data)
    res.status(200).json({
      status: "success",
      message: "Reservation updated successful",
      data: {reservation}
    });
})

const managerUpdateReservation = catchError(async(req:IGetMangerInfoRequest, res) =>{
    const data = {...req.body}

    const reservation = await reservationService.updateReservation(req.params.id, data)
    res.status(200).json({
      status: "success",
      message: "Reservation updated successful",
      data: {reservation}
    });
})

export {
    getReservations, getReservation, createReservation, getUserReservation, updateReservation, managerUpdateReservation
}