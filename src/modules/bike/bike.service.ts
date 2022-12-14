import { IBike } from "./bike.interface"
import Bike from "./bike.model"
import CustomError from "@utils/CustomError.class";


const getBikes:(filter:object) => Promise<IBike[]> = async (filter)=> {
    return await Bike.aggregate([
      {$match:filter},
    ]).exec()
}
const getBike:(id: string) => Promise<IBike> = async (id)=> {
    const bike = await Bike.findById(id)
    if (!bike) throw new CustomError(404, "Bike not found");
    return bike;
}

const createBike : (data:IBike) => Promise<any> = async(data) => {
 let save = await Bike.create(data)
}

const deleteBike: (id: string) => Promise<void> = async (id) => {
    const bike = await Bike.findOneAndDelete({ _id:id });
    if (!bike) throw new CustomError(404, "Manager not found");
  };
  
  const updateBike: (id: string, data: IBike) => Promise<IBike> = async (
    id,
    data
  ) => {
    const bike = await Bike.findByIdAndUpdate(id, data);
    if (!bike) throw new CustomError(404, "Bike not found");
  
    return bike;
  };

export default {
    getBikes, getBike, createBike, deleteBike, updateBike
}