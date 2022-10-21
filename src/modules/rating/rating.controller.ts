import { IGetUserInfoRequest } from "@middlewares/authentication";
import catchError from "@utils/catchError";
import bikeService from "modules/bike/bike.service";
import ratingService from "./rating.service";
const createRating = catchError(async(req:IGetUserInfoRequest, res) =>{
    const data={...req.body, user_id: req.userID}

    if(await ratingService.ratingExists({user_id:req.userID, bike_id:data.bike_id, reservation_id:data.reservation_id})){
        return  res.status(200).json({
            status: "success",
            message: "You already rate the reservation",
          });
      }
    await ratingService.createRating(data)

    // let rate = await ratingService.sumRating({
    //     // $match: {bike_id: data.bike_id}
    //     $group:{_id:null, total_sum:{$sum:"$rate"}}
    // })
    // let count = await ratingService.countRating({bike_id: data.bike_id})
    // console.log({rate, count})
    // let averageRate = sum/count
    // await bikeService.updateBike(data.bike_id, {rate:averageRate})

    res.status(200).json({
        status: "success",
        message: "Rating created successful",
      });
})

export {
    createRating
}