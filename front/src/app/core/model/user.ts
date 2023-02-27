import { Topic } from "./topic";

export class User {
    constructor(public id: number, public username: string, public email: string, public following: Topic[]) { }
}