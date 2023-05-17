import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "../constants";
import { RequestUI } from "../models/request";

@Injectable()
export class RequestService {
    REQUEST_URL: string = Constants.BASE_URL + 'request/';

    constructor (private http: HttpClient){

    }

    acknowledge(requestId: number, vendorId: number): Observable<any> {
        return this.http.put<any>(`${this.REQUEST_URL}acknowledge/${requestId}/${vendorId}`, {requestId: requestId, vendorId: vendorId});
    }

    add(requests: RequestUI[]){
        return this.http.post<RequestUI[]>(`${this.REQUEST_URL}add`, requests);
    }

    getRequestsByUserId(userId: number): Observable<Response[]>{
        return this.http.get<Response[]>(`${this.REQUEST_URL}getByUserId/${userId}`);
    }

    update(requests: RequestUI[]){
        return this.http.put<RequestUI[]>(`${this.REQUEST_URL}update`, requests);
    }
}