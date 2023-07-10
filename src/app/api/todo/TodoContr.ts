
import{JsonController,Get,Post, Delete, Patch, Body, QueryParam, Res, Param } from 'routing-controllers'
import { Response } from 'express';
import { App } from "../../../infra/App";
import {TodoService}from './TodoService'
import {ITodo} from './TodoTypes'


@JsonController('/todo')
export class Todo {
    public app = new App();
    public service = new TodoService();
    @Post('/')
    async create (@Body() body:ITodo ,@Res() res:Response){
      const result =await this.service.create(body)
       return res.status(201).json(result)
    }
    @Get('/')
    async getAll(@QueryParam ('page') page:number ,@QueryParam('limit') limit:number,@Body() body:any, @Res() res:Response){
       const result =await this.service.getAll(page, limit,body )
       return res.status(200).json(result)
    }
    @Get('/:id')
    async getOne(@Param('id') id:string, @Res() res:Response){
        const result =await this.service.getOne(id)
       return res.status(200).json(result)
    }
    @Patch('/:id')
    async update (@Param('id') id:string, @Body() body:ITodo ,@Res() res:Response){
        const result =await this.service.update(id,body)
       return res.status(200).json(result)
    }
    @Delete('/:id')
    async delete (@Param('id') id:string, @Res() res:Response){
        const result =await this.service.delete(id)
       return res.status(200).json(result)

    }

}