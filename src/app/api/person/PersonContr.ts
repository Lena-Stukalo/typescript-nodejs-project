import{JsonController,Get,Post,Body,Res } from 'routing-controllers'
import { Response } from 'express';
import { App } from "infra/App";
import{IPersonSignUp,IPersonSignIn}from './PersonType'
import{PersonService}from './PersonService'

@JsonController('/person')
export class Person {
    public app = new App();
    public service=new PersonService()
    @Post('/signUp')
    async signUp (@Body() body:IPersonSignUp ,@Res() res:Response){
        const result =await this.service.signUp(body)
        return res.status(201).json({name:result.name,
        email:result.email})
    }
    @Post('/signIn')
    async signIn(@Body() body:IPersonSignIn ,@Res() res:Response){
        const result =await this.service.signIn(body)
        return res.status(201).json({token:result})
    }
    @Get('current')
    async current(){

    }
    @Get('/logout')
    async logOut(){
        
    }

}