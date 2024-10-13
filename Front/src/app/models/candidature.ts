import { Offer } from "./offer";

export enum Status {
    en_cours,accépté,refusé
  }
export class Candidature {
    id!:number;
    file!:File;
    idCandidat!:number;
    offer!:Offer;
    status!:Status;
    applicationDate!:Date;
}
