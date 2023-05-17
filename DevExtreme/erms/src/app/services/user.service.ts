import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "../constants";
import { User } from "src/app/models/user";

@Injectable()
export class UserService {
    constructor (private http: HttpClient){

    }

    getUsers(): Observable<User[]>{
        return this.http.get<User[]>(`${Constants.BASE_URL}user`);
    }
}