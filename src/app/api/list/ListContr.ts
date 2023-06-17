
import { App } from "infra/App";

import{JsonController,Get,Post, Delete, Patch } from 'routing-controllers'

@JsonController('/list')
export class List {
    public app = new App();

    @Post('/')
    async create (){
        return "Hello"
    }
    @Get('/')
    async getAll(){

    }
    @Get('/:id')
    async getOne(){
        
    }
    @Patch('/:id')
    async update (){

    }
    @Delete('/:id')
    async delete (){

    }

}