import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "../constants";
import { Supply } from "src/app/models/supply";

@Injectable()
export class SupplyService {
    constructor (private http: HttpClient){

    }

    getSupplies(): Observable<Supply[]>{
        return this.http.get<Supply[]>(`${Constants.BASE_URL}supply`);
    }
}