export enum typeOffer {
    stage,job
  }
export class Offer {
    id!:number;
    titre!:string;
    description!:string;
    lastDateApplication!:Date;
    nbrCandidature!:number;
    file!:File;
    exibitorId!:number;
    offer!:typeOffer
}
