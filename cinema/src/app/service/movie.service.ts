import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageMovieDTO} from "../dto/page-movie-dto";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }
  getListMovie(pageMovieDTO: PageMovieDTO): Observable<any> {
    const name = pageMovieDTO.name;
    const page = pageMovieDTO.page;
    const size = pageMovieDTO.size;
    return this.http.get<any>(this.API_URL + '/admin/movie?name=' + name + '&page=' + page + '&size=' + size);
  }
  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(this.API_URL + '/admin/movie/' + id);
  }
}
