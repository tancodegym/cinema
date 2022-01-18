import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../model/movie';

const URL_API = 'http://localhost:8080/api/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) {
  }

  getAllListMovie(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(URL_API + '/list');
  }

  getListDayShowByIdMovie(id: number): Observable<any> {
    return this.httpClient.get<string[]>(URL_API + '/' + id + '/day-show');
  }

  getListHourShowByIdMovie(id: number): Observable<any> {
    return this.httpClient.get<string[]>(URL_API + '/' + id + '/hour-show');
  }
}
