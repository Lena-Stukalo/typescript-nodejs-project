
  import { Request } from 'express';
  import jwt, { JwtPayload } from 'jsonwebtoken'
  import {RequestError}from '../helpers/RequestError'
  import {Person}from '../models/Person'
  import{IPersonDB}from '../app/api/person/PersonType'

export interface IDecoded {
    email: string | JwtPayload;
   }
   export interface CustomRequest extends Request {
    user: IPersonDB
   }
export async function  authenticate (auth:string | undefined, req:CustomRequest):Promise<CustomRequest> {
    try {
        const [bearer, token] = auth!.split(" ");
        if (bearer !== "Bearer") {
          throw RequestError(401, "Unauthorized");
        }
        const payload  = jwt.verify(token, process.env.SECRET_KEY!)as IDecoded;
        const user = await Person.findOne({email:payload.email}) as IPersonDB ;
        if (!user || user.token !== token) {
          throw RequestError(401, "Unauthorized");
        }
        (req).user = user;
        return req;
      
      } catch (error:any) {
        if (!error.status) {
          error.status = 401;
        }
        throw RequestError(401, "Unauthorized");
      }
};