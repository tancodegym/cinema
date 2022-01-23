import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserCreate} from "../model/UserCreate";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
private URL = 'http://localhost:8080/api/public/user/';
  constructor(private httpClient: HttpClient) { }
  saveUser(userCreate:UserCreate): Observable<void> {
    return this.httpClient.post<void>(this.URL + 'create', userCreate);
  }
}
