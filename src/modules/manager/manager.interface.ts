import { Document, Model } from "mongoose";

export interface IManager extends Document {
    name:string,
    email: string,
    password: string,
}

export interface IManagerModel extends Model<IManager> {
    findByCredentials: (email: string, password: string) => IManager
    generateAuthToken: (id:string, email:string) => string
}
