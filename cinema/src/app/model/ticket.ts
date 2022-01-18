import {User} from './user';
import {Schedule} from './schedule';

export class Ticket {
  id: number;
  code: string;
  status: number;
  user: User;
  schedule: Schedule;
}
