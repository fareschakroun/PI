import { supplierUser } from "./SupplierUser"
import { User } from "./user"

export class message{

    content:string 
    receiverFK: number
    senderFK: number
    createdAt:string
    isButton : number 
    constructor(content: string, senderFK: number, receiverFK: number ,isButton : number ) {
        this.content = content;
        this.senderFK = senderFK;
        this.receiverFK = receiverFK;
        this.isButton = isButton ;
    }
}