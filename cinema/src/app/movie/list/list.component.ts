import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Movie} from "../../model/movie";
import {PageMovieDTO} from "../../dto/page-movie-dto";
import {MovieService} from "../../service/movie.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  page = 0;
  size = 2;
  nameDelete: string;
  idDelete: number;
  pageMovie: any;
  movieList: Movie[];
  searchForm: FormGroup;
  pageMovieDTO: PageMovieDTO;

  constructor(private movieService: MovieService) {
    this.searchForm = new FormGroup({
        name: new FormControl(''),
        page: new FormControl(this.page),
        size: new FormControl(this.size),
      }
    );

  }

  ngOnInit(): void {
    this.getListMovie();
  }

  private getListMovie() {
    this.pageMovieDTO = this.searchForm.value;
    this.movieService.getListMovie(this.pageMovieDTO).subscribe(value => {
      this.pageMovieDTO = value;
      this.movieList = value.content;
    });
  }

  previousPage() {
    this.page--;
    this.searchForm = new FormGroup({
        name: new FormControl(''),
        page: new FormControl(this.page),
        size: new FormControl(this.size),
      }
    );
    this.ngOnInit();
  }

  nextPage() {
    this.page++;
    this.searchForm = new FormGroup({
        name: new FormControl(''),
        page: new FormControl(this.page),
        size: new FormControl(this.size),
      }
    );
    this.ngOnInit();
  }

  getMovieDelete(mov: Movie) {
    this.idDelete = mov.id;
    this.nameDelete = mov.name;
  }

  deleteMovie() {
    this.movieService.deleteMovie(this.idDelete).subscribe(value => {
      this.ngOnInit();
    });
  }

  searchEmployee() {
    this.page = 0;
    this.pageMovieDTO = this.searchForm.value;
    this.movieService.getListMovie(this.pageMovieDTO).subscribe(value => {
      this.pageMovie = value;
      this.movieList = value.content;
      console.log(this.movieList);
      this.ngOnInit();
    });
  }
}
