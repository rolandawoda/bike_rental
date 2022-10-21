import { IRating } from "./rating.interface";
import Rating from "./rating.model";

const createRating:(data:IRating)=> Promise<any>= async(data)=>{
    await Rating.create(data)
}

const sumRating:(filter:object) => Promise<any>= async(filter)=>{
   return await Rating.aggregate([filter]).exec()
} 

const countRating:(filter:object) => Promise<any>= async(filter) => {
    return await Rating.count(filter)
}

const ratingExists:(filter:object) => Promise<boolean> = async(filter) =>{
    return await Rating.exists(filter)
 }

export default{
    createRating, sumRating, ratingExists, countRating
}