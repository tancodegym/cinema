import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {StatsService} from "../../service/stats.service";
import {UserStats} from "../../model/user-stats";
import {MovieStats} from "../../model/movie-stats";

@Component({
  selector: 'app-movies-stats',
  templateUrl: './movies-stats.component.html',
  styleUrls: ['./movies-stats.component.css']
})
export class MoviesStatsComponent implements OnInit {

  constructor(private router: Router,
              private statsService: StatsService) {
    this.statsService.getAllMovie().subscribe(value => {
      this.movieStats = value;
      this.maxDate.setDate(this.maxDate.getDate() + 7);
      this.bsRangeValue = [this.bsValue, this.maxDate];
      this.getName(value);
      this.movieCharjs(this.labels, this.data, 'myChart');
    });
  }
  movieStats: MovieStats[];
  startDate: string;
  endDate: string;
  canvas: any;
  ctx: any;
  bsRangeValue: Date[];
  maxDate = new Date();
  bsValue = new Date();
  check = false;
  labels: [];
  page = 2;
  data = {
    labels: []
    ,
    datasets: [
      {
        type: 'bar',
        label: 'Tổng tiền',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)'
      },

      {
        type: 'line',
        label: 'Số lương vé',
        data: [],
        fill: false,
        borderColor: 'rgb(54, 162, 235)'
      }]
  };
  chart = null;
  ngOnInit(): void {
  }
  private getName(movieStats1: MovieStats[]) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < movieStats1.length; i++) {
      this.data.labels.push(movieStats1[i].name_movie);
      this.data.datasets[0].data.push(movieStats1[i].money);
      this.data.datasets[1].data.push(movieStats1[i].ticket);
    }
  }
  private movieCharjs(labels, data, myChart) {
    if (this.chart != null) {
      this.chart.destroy();
    }
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    // @ts-ignore
    this.chart = new Chart(this.ctx, {
      type: 'scatter',
      data: this.data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  onPrint() {
    window.print();
  }
  search() {
    if (this.bsRangeValue[0].getMonth() < 9 && this.bsRangeValue[0].getDate() < 10) {
      this.startDate = this.bsRangeValue[0].getFullYear().toString()
        + '-0' + (this.bsRangeValue[0].getMonth() + 1).toString()
        + '-0' + this.bsRangeValue[0].getDate().toString();
    } else if (this.bsRangeValue[0].getMonth() < 9) {
      this.startDate = this.bsRangeValue[0].getFullYear().toString()
        + '-0' + (this.bsRangeValue[0].getMonth() + 1).toString()
        + '-' + this.bsRangeValue[0].getDate().toString();
    } else if (this.bsRangeValue[0].getDate() < 10) {
      this.startDate = this.bsRangeValue[0].getFullYear().toString()
        + '-' + (this.bsRangeValue[0].getMonth() + 1).toString()
        + '-0' + this.bsRangeValue[0].getDate().toString();
    } else {
      this.startDate = this.bsRangeValue[0].getFullYear().toString()
        + '-' + (this.bsRangeValue[0].getMonth() + 1).toString()
        + '-' + this.bsRangeValue[0].getDate().toString();
    }
    if (this.bsRangeValue[1].getMonth() < 9 && this.bsRangeValue[1].getDate() < 10) {
      this.endDate = this.bsRangeValue[1].getFullYear().toString()
        + '-0' + (this.bsRangeValue[1].getMonth() + 1).toString()
        + '-0' + this.bsRangeValue[1].getDate().toString();
    } else if (this.bsRangeValue[1].getMonth() < 9) {
      this.endDate = this.bsRangeValue[1].getFullYear().toString()
        + '-0' + (this.bsRangeValue[1].getMonth() + 1).toString()
        + '-' + this.bsRangeValue[1].getDate().toString();
    } else if (this.bsRangeValue[1].getDate() < 10) {
      this.endDate = this.bsRangeValue[1].getFullYear().toString()
        + '-' + (this.bsRangeValue[1].getMonth() + 1).toString()
        + '-0' + this.bsRangeValue[1].getDate().toString();
    } else {
      this.endDate = this.bsRangeValue[1].getFullYear().toString()
        + '-' + (this.bsRangeValue[1].getMonth() + 1).toString()
        + '-' + this.bsRangeValue[1].getDate().toString();
    }
    this.statsService.getMovieStats(this.startDate, this.endDate).subscribe(value => {
      this.chart.destroy();
      this.check = false;
      this.movieStats = value;
      this.movieCharjs(this.labels, this.data, 'myChart');

    }, error => {
      this.chart.destroy();
      this.check = true;
      this.movieStats = [];
    });

  }

}
