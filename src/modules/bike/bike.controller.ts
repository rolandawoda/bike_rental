import catchError from "@utils/catchError";
import bikeService from "./bike.service";

const getBikes = catchError(async (req, res) => {
    let bikes = await bikeService.getBikes();
  
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