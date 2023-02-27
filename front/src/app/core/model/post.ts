import { Topic } from "./topic";
import { User } from "./user";

export class Post {
    constructor(public id: number, public name: string, public topic: Topic, public content: string, public date: string, public author: User) { }
}