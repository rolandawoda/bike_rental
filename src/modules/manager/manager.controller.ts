import CustomError from "@utils/CustomError.class";
import catchError from "@utils/catchError";

import managerService from "./manager.service";
import { IGetMangerInfoRequest } from "@middlewares/authentication";

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

const getManager = catchError(async(req:IGetMangerInfoRequest, res) => {
    let manager = await managerService.getManager(req.managerID)

    res.status(201).json({
        status: 'success',
        message: 'Manager profile',
        data:{
            manager
        }
     })
})

const getManagers = catchError(async(req:IGetMangerInfoRequest, res) => {
    let managers = await managerService.getManager(req.managerID)

    res.status(201).json({
        status: 'success',
        message: 'Managers',
        data:{
            managers
        }
     })
})

const deleteManager = catchError(async (req, res) => {
    const { id } = req.params
    await managerService.deleteManager(id)
  
    res.status(200).json({
      status: 'success',
      message: 'Manager deleted successfully',
      data: null
    })
  })

  const updateManager = catchError(async (req, res) => {
    const { id } = req.params
    const data = req.body
    const manager = await managerService.updateManager(id, data)
  
    res.status(201).json({
      status: 'success',
      message: 'Manager updated successfully',
      data: manager
    })
  })

export { getManagers, getManager,registerManager , logingManager, deleteManager, updateManager};
