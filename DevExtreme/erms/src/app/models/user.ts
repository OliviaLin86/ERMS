import { UserType } from "src/app/enums/userType";

export class User {
    userId: number;
    userName: string;
    userType: UserType;

    constructor(){
        this.userId = 0;
        this.userName = '';
        this.userType = UserType.Client;
    }
}