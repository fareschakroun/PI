import {Post} from './post';
import { User } from './user';

export class Comment{
  idComment!: number;
  likesCount!: number;
  dislikesCount!:number;
  mostPertinentComment!: boolean;
  textComment!: string;
  dateCreationComment!: string ;
  post!: Post;
  userId:number
  fullUser:User
  ActiveLike:Like;
  likes!: Like[];
}
export class Like {
  id: number;
  userID: number;
  eventID: number;
  commentID: number;
  status: string;
  datetime: Date;
}