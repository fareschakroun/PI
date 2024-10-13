export class User {
    //id: number = 2;
    //nom: string = "Anas";
    //prenom: string = "Maghrebi";
    //role: string = "student";
    //role: string = "exibitor";
    constructor() {
        this.id = 2;
        this.firstname = "Anas";
        this.lastname = "Maghrebi";
        this.cv = null; // Assuming you don't have a file to assign initially
        this.name = "";
        this.phonenumber = "";
        this.role = "student"; // Or "exibitor"
        this.email = "";
        this.password = "";
      }

    id! : number ;
    firstname!:String;
    lastname!: String ;
    cv: File ;
    name: String ;
    phonenumber: String ;
    role: String ;
    email: String;
    password: String;
    points : number;
    imageUrl: string;
    }

export enum role {
    exhibitor,
    student,
    alumni,
    teacher,
    supplier
}