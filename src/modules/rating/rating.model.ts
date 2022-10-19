import mongoose, { Schema } from "mongoose";
import { IRating, IRatingModel } from "./rating.interface";

const ratingSchema = new Schema<IRating>({
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
    reservation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation',
        required: [true, 'Reservation ID is required']
    },
    rate: {
        type: Number,
        required: [true, "Rate is required"],
      },
},{ timestamps: true })

const Rating = (mongoose.models["Rating"] || mongoose.model<IRating, IRatingModel>("Rating", ratingSchema)) as IRatingModel

export default Rating