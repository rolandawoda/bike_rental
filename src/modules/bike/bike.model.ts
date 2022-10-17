import mongoose, { Schema } from "mongoose";
import { IBike, IBikeModel } from "./bike.interface";

const bikeSchema = new Schema<IBike>({
    bike_model:{
        type: String,
        required: [true, "Model is required"],
    },
    color:{
        type: String,
        required: [true, "Color is required"],
    },
    location:{
        type:{type: String, default: "Point"},
        longitude:{type: Number,  required: [true, "Longitude is required"],},
        latitude:{type: Number,  required: [true, "Latitude is required"],}
    },
    available:{
        type: Boolean,
       default: true
    },
}, {timestamps:true})

const Bike = (mongoose.models["Bike"] || mongoose.model<IBike, IBikeModel>("Bike", bikeSchema)) as IBikeModel

export default Bike;