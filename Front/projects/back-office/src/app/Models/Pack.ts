import { Room } from './room';


export class Pack{
    idPack!:number;
    typePack!:string;
    description!:string;
    status!:boolean;
    price!:number;
    reserved!:boolean;
    room!:Room;
}