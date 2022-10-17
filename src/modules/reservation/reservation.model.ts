import mongoose, { Schema } from "mongoose";
import { IReservation, IReservationModel, ReservationStatus } from "./reservation.interface";

const reservationSchema = new Schema<IReservation>({
    bike_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bike',
        required: [true, 'Bike ID is required']
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    date_from: {
        type: String,
        required: [true, "Date From is required"],
      },
    date_to: {
        type: String,
        required: [true, "Date To is required"],
      },
      status: {
        type: String,
        enum: ReservationStatus,
        default: ReservationStatus.PENDING
      },
},{ timestamps: true })

const Reservation = (mongoose.models["Reservation"] || mongoose.model<IReservation, IReservationModel>("Reservation", reservationSchema)) as IReservationModel

export default Reservation