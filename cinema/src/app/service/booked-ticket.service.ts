import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserCreate} from "../model/UserCreate";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookedTicketService {
  private URL = 'http://localhost:8080/api/public/ticket/';
  constructor(private httpClient: HttpClient) { }

  getListBookedTicket(id:number, page:number): Observable<any> {
    return this.httpClient.get<any>(this.URL + 'listticket?id=' + id + '&page=' + page);
  }
}
