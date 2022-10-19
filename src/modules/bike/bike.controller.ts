import catchError from "@utils/catchError";
import bikeService from "./bike.service";

const getBikes = catchError(async (req, res) => {
  let filter = {}
  let params = req.query
  if(params.color) filter["color"] = params.color
  if(params.model) filter["bike_model"] = params.model
  if(params.longitude && params.latitude) {
    filter["location.longitude"] = params.longitude
    filter["location.latitude"] = params.latitude
  }
  if(params.from && params.to){
    let start = new Date((params.from) as any * 1000)
    let end = new Date((params.to) as any * 1000)
    filter["createdAt"] = {$gte: start, $lt:end }
  }
  if(params.rate) {
    // filter["bike_model"] = params.model
  }
  
  let bikes = await bikeService.getBikes(filter);
  
    res.status(200).json({
      status: "success",
      message: "Bikes",
      data: {
        bikes,
      },
    });
  });
const getBike = catchError(async (req, res) => {
    let bike = await bikeService.getBike(req.params.id);
  
    res.status(200).json({
      status: "success",
      message: "Bike",
      data: {
        bike,
      },
    });
  });

  const createBike = catchError(async (req, res) =>{
      const data = {...req.body}

      const bike = await bikeService.createBike(data)
      res.status(200).json({
        status: "success",
        message: "Bike created successful",
      });
  })

  const deleteBike = catchError(async (req, res) => {
    const { id } = req.params;
    await bikeService.deleteBike(id);
  
    res.status(200).json({
      status: "success",
      message: "Bike deleted successfully",
      data: null,
    });
  });

  const updateBike = catchError(async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const bike = await bikeService.updateBike(id, data);
  
    res.status(200).json({
      status: "success",
      message: "Bike updated successfully",
      data: bike,
    });
  });

export {
    getBikes, getBike, createBike, deleteBike, updateBike
}