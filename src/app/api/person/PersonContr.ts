import{JsonController,Get,Post,Body,Res, Req,UseBefore } from 'routing-controllers'
import { Response } from 'express';
import { App } from "../../../infra/App";
import{IPersonSignUp,IPersonSignIn}from './PersonType'
import{PersonService}from './PersonService'
import{CustomRequest}from '../../../middlewares/authenticate'
import { MyMiddleware } from '../../../middlewares/Middelwares';


@JsonController('/person')
export class Person {
    public app = new App();
    public service=new PersonService()
    @Post('/signUp')
    async signUp (@Body() body:IPersonSignUp ,@Res() res:Response){
        const result =await this.service.signUp(body)
        return res.status(201).json({name:result.name,
        email:result.email,
    token:result.token})
    }
    @Post('/signIn')
    async signIn(@Body() body:IPersonSignIn ,@Res() res:Response){
        const result =await this.service.signIn(body)
        return res.status(200).json({token:result})
    }
    @Get('/current')
    @UseBefore(MyMiddleware)
    async current(@Req() req:CustomRequest, @Res() res:Response){
       
        const result =await this.service.current(req)
                return res.status(200).json(result)
    }
    @Get('/logout')
    @UseBefore(MyMiddleware)
    async logOut(@Req() req:CustomRequest,@Res() res:Response){
        const result =await this.service.logout(req)
        return res.status(200).json(result)
    }

}