import { Component, OnInit } from '@angular/core';
import {BookedTicketService} from "../../service/booked-ticket.service";
import {BookedTicket} from "../../model/BookedTicket";

@Component({
  selector: 'app-booked-ticket-list',
  templateUrl: './booked-ticket-list.component.html',
  styleUrls: ['./booked-ticket-list.component.css']
})
export class BookedTicketListComponent implements OnInit {
  page = 0;
  id: number = 1;
  bookedTicketList: BookedTicket[];
  totalPage:number;

  constructor(private bookedTicketService: BookedTicketService) { }

  ngOnInit(): void {
    this.getListBookedTicket();
  }
  getListBookedTicket(){
    this.bookedTicketService.getListBookedTicket(this.id,this.page).subscribe(value => {
      this.bookedTicketList = value.content;
      this.totalPage = value.totalPages;
    })
  }
}
