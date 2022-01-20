import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {StatsService} from "../../service/stats.service";
import {UserStats} from "../../model/user-stats";

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent implements OnInit {


  constructor(private router: Router,
              private statsService: StatsService) {
    this.statsService.getAllUser().subscribe(value => {
      this.userStats = value;
      this.maxDate.setDate(this.maxDate.getDate() + 7);
      this.bsRangeValue = [this.bsValue, this.maxDate];
      this.getName(value);
      this.potentialCustomerChart(this.labels, this.data, 'myChart');
    });
  }
  userStats: UserStats[];
  startDate: string;
  endDate: string;
  canvas: any;
  ctx: any;
  bsRangeValue: Date[];
  maxDate = new Date();
  bsValue = new Date();
  check = false;
  labels: [];
  data = {
    labels: []
    ,
    datasets: [
      {
        type: 'line',
        label: 'Mã thành viên',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)'
      },
      {
        type: 'line',
        label: 'Số lượng vé',
        data: [],
        fill: false,
        borderColor: 'rgb(54, 162, 235)'
      },
      {
        type: 'line',
        label: 'Tổng tiền',
        data: [],
        fill: false,
        borderColor: 'rgb(54, 162, 235)'
      },
    ]
  };
  chart = null;
  ngOnInit(): void {
  }
  private getName(arr: UserStats[]) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arr.length; i++) {
      this.data.labels.push(arr[i].code_user);
      this.data.datasets[0].data.push(arr[i].ticket);
      this.data.datasets[1].data.push(arr[i].point);
    }
  }
  private potentialCustomerChart(labels, data, myChart) {
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
    this.statsService.getUserStats(this.startDate, this.endDate).subscribe(value => {
      this.chart.destroy();
      this.check = false;
      this.userStats = value;
      this.potentialCustomerChart(this.labels, this.data, 'myChart');

    }, error => {
      this.chart.destroy();
      this.check = true;
      this.userStats = [];
    });

  }

}
