export class User {
    //id: number = 2;
    //nom: string = "Anas";
    //prenom: string = "Maghrebi";
    //role: string = "student";
    //role: string = "exibitor";

    id : number ;
    firstname!:String;
    lastname!: String ;
    cv: File ;
    name: String ;
    phonenumber: String ;
    role: String ;
    email: String;
    password: String;
    roomid!:number;
}

export enum role {
    exhibitor,
    student,
    alumni,
    teacher,
    supplier
}
