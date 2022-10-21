import { IGetUserInfoRequest } from "@middlewares/authentication";
import catchError from "@utils/catchError";
import bikeService from "modules/bike/bike.service";
import ratingService from "./rating.service";
const createRating = catchError(async(req:IGetUserInfoRequest, res) =>{
    const data={...req.body, user_id: req.userID}

    // if(await ratingService.ratingExists({user_id:req.userID, bike_id:data.bike_id, reservation_id:data.reservation_id})){
    //     return  res.status(200).json({
    //         status: "success",
    //         message: "You already rate the reservation",
    //       });
    //   }
    // await ratingService.createRating(data)

    let sumRating = await ratingService.sumRating({}, 
        {
            _id: "$bike_id",
            total_sum: {$sum: "$rate"}
        }
    )
    let total_sum = sumRating.filter((r: any)=> r._id == data.bike_id)[0].total_sum
    let count = await ratingService.countRating({bike_id: data.bike_id})
    let bike = await bikeService.getBike(data.bike_id)
    bike.rate = total_sum/count
    await bikeService.updateBike(data.bike_id, bike)

    res.status(200).json({
        status: "success",
        message: "Rating created successful",
      });
})

export {
    createRating
}