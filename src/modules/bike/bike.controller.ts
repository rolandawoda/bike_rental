import catchError from "@utils/catchError";
import bikeService from "./bike.service";

const getBikes = catchError(async (req, res) => {
  let filter = {}
  let params = req.query
  if(params.color) {
    let color = params.color as string
    filter["color"] = { $in: color.split(",")}
  }
  if(params.model) {
    let model = params.model as string
    filter["bike_model"] = { $in: model.split(",")}
  }
  if(params.location){
    let location = params.location as string, lng = [], lat = []
    location.split(",").map((m) => {
      let sp = m.split(" ")
      lng.push(sp[0])
      lat.push(sp[1])
    })

    filter["location.longitude"] = {$in: lng}
    filter["location.latitude"] = {$in: lat}
  }
 
  if(params.from && params.to){
    let start = new Date((params.from) as any * 1000)
    let end = new Date((params.to) as any * 1000)
    filter["createdAt"] = {$gte: start, $lt:end }
  }
  if(params.rate) {
    filter["rate"] = {$in: params.rate}
  }
if(params.available){
  filter["available"] = params.available
}
  console.log(filter)
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