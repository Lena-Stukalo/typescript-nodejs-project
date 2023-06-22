import { Response} from 'express';
import{JsonController,Get,Post, Delete, Patch, UseBefore,Req, Res, Body,Param,QueryParam } from 'routing-controllers'
import { App } from "infra/App";
import { MyMiddleware} from '../../../middlewares/Middelwares'
import{CustomRequest} from '../../../middlewares/authenticate'
import { ListService } from './ListService';
import { IList } from './ListType';


@JsonController('/list')
export class List {
    public app = new App();
    public service=new ListService()
    @Post('/')
    @UseBefore(MyMiddleware)
    async create (@Res() res:Response, @Req() req:CustomRequest, @Body()body:IList){
    const result = await this.service.create(req,body)
        return res.status(201).json( result)
    }
    @Get('/')
    @UseBefore(MyMiddleware)
    async getAll(@QueryParam ('page') page:number ,@QueryParam('limit') limit:number, @Res() res:Response, @Req() req :CustomRequest){
        const result =await this.service.getAll(page, limit,req)
        return res.status(200).json(result)
     }
    @Get('/:id')
    @UseBefore(MyMiddleware)
    async getOne(@Param('id') id:string, @Res() res:Response){
        const result =await this.service.getOne(id)
       return res.status(200).json(result)}
       
    @Patch('/:id')
    @UseBefore(MyMiddleware)
    async update (@Param('id') id:string, @Body() body:IList ,@Res() res:Response){
        const result =await this.service.update(id,body)
       return res.status(200).json(result)
    }
    @Delete('/:id')
    @UseBefore(MyMiddleware)
    async delete (@Param('id') id:string, @Res() res:Response){
        const result =await this.service.delete(id)
       return res.status(200).json(result)}
    }

