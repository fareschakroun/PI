export class SupplyRequest{
    id!:number;
    requirement!:String;
    quantity!: number ;
    price: number ;
    boothPosition: String ;
    productname: String ;
    servicename: String ;
    type : String ;
    createdAt : string ;
    image!:Image
}

export class Image {
    id?: number;
    name?: string;
    imageUrl?: string;
    imageId?: string;
}