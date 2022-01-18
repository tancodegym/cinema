import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {PageUserDTO} from '../dto/PageUserDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions: any;
  private API_URL = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }
  getListUser(pageUserDTO: PageUserDTO): Observable<any> {
    const code = pageUserDTO.code;
    const name = pageUserDTO.name;
    const phone = pageUserDTO.phone;
    const page = pageUserDTO.page;
    const size = pageUserDTO.size;
    return this.http.get<any>(this.API_URL + '/user?code=' + code + '&name=' + name + '&phone='
      + phone + '&page=' + page + '&size=' + size, this.httpOptions);
  }

  getAll(): Observable<User[] | any> {
    return this.http.get(this.API_URL + '/user/list', this.httpOptions);
  }

  getCode(): (any) {
    return this.http.get(this.API_URL + '/user/code', this.httpOptions);
  }

  findById(id: number) {
    return this.http.get(this.API_URL + '/user/' + id, this.httpOptions);
  }

  updateUser(user: User) {
    return this.http.patch(this.API_URL + '/user/update', user, this.httpOptions);
  }


}
