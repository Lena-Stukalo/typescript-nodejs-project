import {Iservice} from '../types/service'

export class Tcp implements Iservice{
    private static instanse:Tcp;
    constructor (){
        if (!Tcp.instanse){
            Tcp.instanse= this
        }
        return Tcp.instanse
    }
    init (){
       

console.log('Tcp service started')
}
}