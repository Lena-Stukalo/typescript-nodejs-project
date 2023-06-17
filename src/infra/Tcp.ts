import 'reflect-metadata';
import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {useExpressServer} from 'routing-controllers'
import {Iservice} from '../types/service'
import {controllers} from '../app/api/controllers'

dotenv.config();
export class Tcp implements Iservice{
    private static instanse:Tcp;
    private routePrefix='/api'
    public server = express()
    constructor (){
        if (!Tcp.instanse){
            Tcp.instanse= this
        }
        return Tcp.instanse
    }
    init (){
       const { server, routePrefix}= this;
       useExpressServer(server,{
        cors:true, 
        defaultErrorHandler:true,
        controllers,
        routePrefix
    })
    return new Promise<boolean>((resolve:any)=>{
        mongoose
        .connect(process.env.DB_HOST!)
        .then(() => {
            server.listen(process.env.PORT, () => {
            console.log(`Server running. Use our API on port: ${process.env.PORT}`);
            });
            console.log("Database connection successful");
        })
        .catch((error) => {
            console.log(error.message);
            process.exit(1);
        });
        return resolve(true)
    })
}
}