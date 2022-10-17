import Manager from "./manager.model";
import { IManager } from "./manager.interface";
import CustomError from "@utils/CustomError.class";

const getManagers: () => Promise<any> = async () => {};
const registerManager: (data:IManager) => Promise<any> = async (data) => {
  let check = await Manager.findOne({email:data.email})
  if(check){
    throw new CustomError(401, "Manager with this email already exist")
  }

  let save = await Manager.create(data)
};

const loginManager: (email: string, password:string)=>Promise<string> = async(email, password)=>{
  let manager = await Manager.findByCredentials(email, password)

  if (!manager)
    throw new CustomError(
      401,
      'Invalid login crendentials'
    )
    
    const token = Manager.generateAuthToken(manager._id, manager.email)

    return token
}

export default {
  getManagers, registerManager, loginManager
};
