import CustomError from "@utils/CustomError.class";
import catchError from "@utils/catchError";

import managerService from "./manager.service";

const getManagers = catchError(async (req, res) => {});

const registerManager = catchError(async(req, res) =>{
    const data= {...req.body}
  // save
    const manager = await managerService.registerManager(data)
    res.status(201).json({
        status: 'success',
        message: 'Registration successful'
     })
})

const logingManager = catchError(async(req, res) =>{
    const {email, password}:{email:string, password:string} = {...req.body}
    
    const token = await managerService.loginManager(email, password)

    res.status(201).json({
        status: 'success',
        message: 'login successful',
        data:{
            token
        }
     })
})

export { getManagers, registerManager , logingManager};
