import {Component, DoCheck, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MovieService} from '../../service/movie.service';
import {Movie} from '../../model/movie';

@Component({
  selector: 'app-movie-select',
  templateUrl: './movie-select.component.html',
  styleUrls: ['./movie-select.component.css']
})
export class MovieSelectComponent implements OnInit, DoCheck {

  idMovie: number;
  movieList: Movie[];
  dayShowList: string[];
  hourShowList: string[];
  movieSelectForm = new FormGroup({
    movie: new FormControl('', Validators.required),
    dayShow: new FormControl('', Validators.required),
    hourShow: new FormControl('', Validators.required)
  });
  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.getAllListMovie();
  }

  getAllListMovie() {
    this.movieService.getAllListMovie().subscribe(value => {
      this.movieList = value;
    });
  }

  getListDayShowByIdMovie() {
    this.movieService.getListDayShowByIdMovie(this.idMovie).subscribe(value => {
      this.dayShowList = value;
      this.getListHourShowByIdMovie();
    });
  }

  getListHourShowByIdMovie() {
    this.movieService.getListHourShowByIdMovie(this.idMovie).subscribe(value => {
      this.hourShowList = value;
    });
  }

  compareMovie(m1: Movie, m2: Movie): boolean {
    return m1 && m2 ? m1.id === m2.id : m1 === m2;
  }

  get movie() {
    return this.movieSelectForm.get('movie');
  }

  get dayShow() {
    return this.movieSelectForm.get('dayShow');
  }

  get hourShow() {
    return this.movieSelectForm.get('hourShow');
  }

  ngDoCheck(): void {
    // console.log(this.movieSelectForm.controls.movie.value);
    // this.idMovie = this.movieSelectForm.controls.movie.value;
    // console.log(this.idMovie);
    // this.movieService.getListDayShowByIdMovie(this.idMovie).subscribe(value => {
    //   this.dayShowList = value;
    //   this.getListHourShowByIdMovie();
    // });
    // console.log(this.idMovie);
  }
}
