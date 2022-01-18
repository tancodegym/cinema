import {DayShow} from './dayShow';
import {HourShow} from './hourShow';
import {Movie} from './movie';

export class Schedule {
  id: number;
  dayShow: DayShow;
  hourShow: HourShow;
  movie: Movie;
}
