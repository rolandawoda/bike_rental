import { IRating } from "./rating.interface";
import Rating from "./rating.model";

const createRating:(data:IRating)=> Promise<any>= async(data)=>{
    await Rating.create(data)
}

export default{
    createRating
}