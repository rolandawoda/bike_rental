import { Document, Model } from "mongoose";

export interface IManager extends Document {}

export interface IManagerModel extends Model<IManager> {}
