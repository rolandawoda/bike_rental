import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import CustomError from '@utils/CustomError.class'
import { IManager } from 'modules/manager/manager.interface'
import config from '@config/config'

export interface IGetMangerInfoRequest extends Request {
    managerID: string
    managerEmail: string
  }

export const authenticateManager = async (
    req: IGetMangerInfoRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.headers['authorization']?.split(' ')[1]
    if (!token) return next(new CustomError(403, 'Unauthorized'))
  
      // @ts-ignore
      const validateToken = jwt.verify(token, config.jwt.secret, {
        ignoreExpiration: false
      })
  
      if (!validateToken)
        return next(new CustomError(403, 'Unauthorized'))
  
      req.managerID = validateToken._id
      req.managerEmail = validateToken.email
  
    next()
  }