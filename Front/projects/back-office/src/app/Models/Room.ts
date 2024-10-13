import { Pack } from "./pack";



export class Room{

    idRoom!:number;
    codeRoom!:string;
    quantity!:number;
    price!:number;
    priceAuction!:number;
    typePack!:string;
    dateDebut!:Date;
    duration !:number;
    description!:string
    status !:boolean;
    maxParticipants!:number;
    confirmedParticipant!:number;
    packages!:Pack[]
}