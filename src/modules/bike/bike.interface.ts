import { Document, Model } from 'mongoose'

export interface IBike extends Document {
    bike_model:string;
    color:string;
    location:object;
    rate: number;
    available:boolean;
}

export interface IBikeModel extends Model<IBike>{

}