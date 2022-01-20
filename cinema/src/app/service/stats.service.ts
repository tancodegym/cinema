import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MovieStats} from "../model/movie-stats";
import {UserStats} from "../model/user-stats";

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private API = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }
  getAllMovie(): Observable<MovieStats[] | any> {
    return this.http.get<MovieStats[] | any>(this.API + '/movie/stats');
  }
  getMovieStats(startDate: string, endDate: string): Observable<MovieStats[] | any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<MovieStats[] | any>(this.API + '/movie/stats/' + startDate + '/' + endDate);
  }
  getAllUser(): Observable<UserStats[] | any> {
    return this.http.get<UserStats[] | any>(this.API + '/user/stats');
  }
  getUserStats(startDate: string, endDate: string): Observable<UserStats[] | any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<UserStats[] | any>(this.API + '/user/stats/' + startDate + '/' + endDate);
  }
}
