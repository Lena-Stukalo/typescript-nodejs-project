import{Tcp}from './Tcp'
import{Iservice}from '../types/service'

export class App implements Iservice {
    private static instanse:App;
    private tcp :Iservice =new Tcp()
    constructor (){
        if (!App.instanse){
            App.instanse= this
        }
        return App.instanse
    }
   async init (){
        const {tcp}= this;
        console.log("Started")
        await tcp.init()
    }
}