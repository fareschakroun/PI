// event.ts

import { Interested } from "./Interested"
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
  }
  
  export class Rating {
    id!: number;
    userID!: number;
    eventID!: number;
    rating!: number;
    comment!: string;
    status!: string;
  }
  export class Comment {
    id: number;
    userID: number;
    eventID: number;
    likesCount: number;
    dislikesCount: number;
    thread: number;
    comment: string;
    status: string;
    datetime: Date;
    level:number;
    likes!: Like[]; // Assuming Like class is defined
    ActiveLike:Like;
  }
  export class Comments {
    level:number;
   comment: Comment;
   replying:boolean;
    list:Comments[]
  }

  export class Like {
    id: number;
    userID: number;
    eventID: number;
    commentID: number;
    status: string;
    datetime: Date;
  }
// event-type.enum.ts

export enum EventType {
    Enterprise_Day = "Enterprise Day",
    Club_Day = "Club Day",
    Association_Day = "Association Day",
  }
  