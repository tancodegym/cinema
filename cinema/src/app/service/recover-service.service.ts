import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
const API = 'http://localhost:8080/api/public/';
@Injectable({
  providedIn: 'root'
})
export class RecoverServiceService {

  constructor(private  http: HttpClient) { }
  getPassword(email:string): Observable<void>{
    return this.http.get<void>(API+'password/'+email);
  }
}
