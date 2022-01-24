import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../model/user';
import {PageUserDTO} from '../../dto/PageUserDTO';
import {UserService} from '../../service/user.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],

})
export class ListComponent implements OnInit {

  page = 1;
  size = 2;
  pageUser: any;
  userList: User[];
  searchForm: FormGroup;
  pageUserDTO: PageUserDTO;
  errMessage: string;

  constructor(private userService: UserService,
              private toastrService: ToastrService) {
    this.searchForm = new FormGroup({
        code: new FormControl(''),
        name: new FormControl(''),
        phone: new FormControl(''),
        page: new FormControl(this.page),
        size: new FormControl(this.size),
      }
    );
  }

  ngOnInit(): void {
    this.getListUser();
  }



  getListUser() {
    this.pageUserDTO = this.searchForm.value;
    this.userService.getListUser(this.pageUserDTO).subscribe(value => {
        this.pageUserDTO = value;
        this.userList = value.content;
      },
      error => {
        this.userList = [];
        this.errMessage = 'Không có dữ liệu.';
      });
  }

  previousPage() {
    this.page--;
    this.searchForm.controls.page.setValue(this.page);
    this.ngOnInit();
  }

  nextPage() {
    this.page++;
    this.searchForm.controls.page.setValue(this.page);
    this.ngOnInit();
  }


  setPage(pages: any) {
    this.page = Number(pages);
    this.searchForm.controls.page.setValue(this.page);
    this.pageUserDTO = this.searchForm.value;
    this.userService.getListUser(this.pageUserDTO).subscribe(value => {
        this.errMessage = null;
        this.pageUser = value;
        this.userList = value.content;
        this.ngOnInit();
      },
      error => {
        this.userList = [];
        this.errMessage = 'Không có dữ liệu cần tìm';
      });
  }
}





