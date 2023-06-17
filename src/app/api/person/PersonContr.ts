
import { App } from "infra/App";

import{JsonController,Get,Post } from 'routing-controllers'

@JsonController('/person')
export class Person {
    public app = new App();

    @Post('/signUp')
    async signUp (){
        return "Hello"
    }
    @Post('/signIn')
    async signIn(){

    }
    @Get('current')
    async current(){

    }
    @Get('/logout')
    async logOut(){
        
    }

}