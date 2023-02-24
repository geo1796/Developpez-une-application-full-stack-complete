import { Topic } from "./topic-response";
import { User } from "./user-reponse";

export class Post {
    constructor(public id: number, public name: string, public topic: Topic, public content: string, public date: string, public author: User) { }
}