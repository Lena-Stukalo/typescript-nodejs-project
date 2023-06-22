import {Response} from 'express';
import { ExpressMiddlewareInterface} from 'routing-controllers';
import {authenticate, CustomRequest} from './authenticate'
export class MyMiddleware implements ExpressMiddlewareInterface {
  // interface implementation is optional

  async use(req: CustomRequest,_: Response, next:(err?: any) => any):Promise<any> {
   
    await authenticate(req.headers.authorization,req)
    next();
  }
}