

import { Supplier } from './Supplier';
import { supplierUser } from './SupplierUser';


export class SupplierOffer {

    id:number ;
    description: string ;
    price:number ;
    supplierRequest:Supplier ;
    supplier: supplierUser 
    status:string
}