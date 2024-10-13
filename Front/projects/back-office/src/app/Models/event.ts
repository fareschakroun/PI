// event.ts

import { Image } from "./image";

export class Event {
    id!: number;
    type!: EventType; // Assuming EventType is also transformed to TypeScript
    name!: string;
    date!: Date;
    createdAt!: Date;
    createdBy!: number;
    note!: string;
    viewsCounter!: number;
    interestedCounter!: number;
    active!: boolean;
    rating!: number;
    collaboration!: boolean;
    lastModifiedAt!: Date;
    lastModifiedBy!: number;
    depositNotes!: string;
// ------ IMAGE THINGS
      imageUrl?:string
      imageIdCloudinary?:string
imageId?:number;
//-------------------   

interesteds?: Interested[]; // Assuming InterestedBy is another TypeScript interface
    images?: Image[];
    ratings?: Rating[];
    presences?:Presence[];
  }
  
  // Assuming the following interfaces for related entities
  
  export class Interested {
    id!: number;
    userID!: number;
    eventID!: number;
    timestamp!: Date;
  }

  export class Rating {
    id!: number;
    userID!: number;
    eventID!: number;
    rating!: number;
    comment!: string;
    status!:string;
  }
  
// event-type.enum.ts

export enum EventType {
    Enterprise_Day = "Enterprise Day",
    Club_Day = "Club Day",
    Association_Day = "Association Day",
  }
  
  export class Presence {
    id: number;
    eventId: number;
    userId: number;
    date: Date;
  }