import { IGetUserInfoRequest } from "@middlewares/authentication";
import catchError from "@utils/catchError";
import ratingService from "./rating.service";
const createRating = catchError(async(req:IGetUserInfoRequest, res) =>{
    const data={...req.body, user_id: req.userID}
    await ratingService.createRating(data)
    res.status(200).json({
        status: "success",
        message: "Rating created successful",
      });
})

export {
    createRating
}