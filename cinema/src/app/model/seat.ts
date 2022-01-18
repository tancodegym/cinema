import {Ticket} from './ticket';

export class Seat {
  id: number;
  name: string;
  price: number;
  status: number;
  ticket: Ticket;
}
