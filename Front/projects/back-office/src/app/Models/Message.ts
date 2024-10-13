import { supplierUser } from "./SupplierUser"
import { User } from "./User"

export class message{

    content:string 
    receiverFK: number
    senderFK: number
    createdAt:string
    isButton : number 

    constructor(content: string, sender: number, receiver: number,isButton:number) {
        this.content = content;
        this.senderFK = sender;
        this.receiverFK = receiver;
        this.isButton = isButton ;
    }
}