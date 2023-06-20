import{JsonController,Get,Post,Body,Res, HeaderParam,Req } from 'routing-controllers'
import { Response } from 'express';
import { App } from "infra/App";
import{IPersonSignUp,IPersonSignIn}from './PersonType'
import{PersonService}from './PersonService'
import{authenticate}from '../../../middlewares/authenticate'
import{CustomRequest}from '../../../middlewares/authenticate'


@JsonController('/person')
export class Person {
    public app = new App();
    public service=new PersonService()
    @Post('/signUp')
    async signUp (@Body() body:IPersonSignUp ,@Res() res:Response){
        const result =await this.service.signUp(body)
        return res.status(201).json({name:result.name,
        email:result.email,
    token:result})
    }
    @Post('/signIn')
    async signIn(@Body() body:IPersonSignIn ,@Res() res:Response){
        const result =await this.service.signIn(body)
        return res.status(200).json({token:result})
    }
    @Get('/current')
    async current(@HeaderParam('authorization') authorization:string, @Req() req:CustomRequest, @Res() res:Response){
        const cusReq=await authenticate(authorization,req);
        const result =await this.service.current(cusReq)
                return res.status(200).json(result)
    }
    @Get('/logout')
    async logOut(@HeaderParam('authorization') authorization:string,@Req() req:CustomRequest,@Res() res:Response){
        const cusReq=await authenticate(authorization,req);
        const result =await this.service.logout(cusReq)
        return res.status(200).json(result)
    }

}