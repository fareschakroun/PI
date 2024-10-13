
export class Supplier{
    id! : number ;
    requirement!:String;
    quantity!: number ;
    price: number ;
    boothPosition: String ;
    productname: String ;
    servicename: String ;
    type : String ;
    status :String ;
    image!:Image;
    supplier : User ;
}
export enum typerequirement {
    isProduct,isService,isProductAndService
}
export enum status {
    NotApproved,Pending,Approved
}
export class Image {
    id?: number;
    name?: string;
    imageUrl?: string;
    imageId?: string;
}
export class User{
    id !: number ;
    nom  : String ;
    numeroTelephone : String;

}
export class MockRoulette {
    id: number;
    randomValue: number;
    spinned: boolean;
    spinCounter: number;
    adminSpinning: boolean;
}