// @ts-ignore

import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';


// import {AngularFireStorage} from '@angular/fire/storage';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

import {UserService} from '../../service/user.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  constructor(private http: HttpClient,
              private router: Router,
              private userService: UserService,
              private activeRouter: ActivatedRoute,
              private toastrService: ToastrService) {
  }

  // tslint:disable-next-line:ban-types
  user: User;
  public errorDB = [];
  // tslint:disable-next-line:ban-types
  checkerr: Boolean;
  selectedImage: any = null;
  urlImg = 'https://i.imgur.com/7Vtlcpx.png';
  userForm: FormGroup = new FormGroup({
    id: new FormControl(),
    username: new FormControl(),
    password: new FormControl('', Validators.compose([Validators.required])),
    image: new FormControl(),
    code: new FormControl(),
    // tslint:disable-next-line:max-line-length
    // name: new FormControl('', Validators.compose([Validators.required, Validators.pattern
    // ('^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ' +
    //   '��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴÝỶỸửữựỵ ỷỹ]*$'), Validators.maxLength(30)])),

    // name: new FormControl('', Validators.compose([Validators.required, Validators.pattern
    // ('(\p{L}+[\p{L}\s]*)'), Validators.maxLength(40)])),

    name: new FormControl('', Validators.compose([Validators.required])),

    birthday: new FormControl('', Validators.compose([Validators.required, Validators.pattern
    ('^(?:0[1-9]|1[012])[-/.](?:0[1-9]|[12][0-9]|3[01])[-/.](?:19\\d{2}|20\\d{2})$'), this.checkDateOfBirth])),

    gender: new FormControl('', Validators.compose([Validators.required])),
    point: new FormControl(),
    idCard: new FormControl(),
    email: new FormControl('', Validators.compose([Validators.required, Validators.pattern
    ('^(?:^|\\s)[\\w!#$%&\'*+/=?^`{|}~-](\\.?[\\w!#$%&\'*+/=?^`{|}~-]+)*@\\w+[.-]?\\w*\\.[a-zA-Z]{2,3}\\b$')])),

    phone: new FormControl('', Validators.compose([Validators.required])),

    address: new FormControl('', Validators.compose([Validators.required])),

  });

  ngOnInit(): void {
    // this.positionService.getListPosition().subscribe(next => {
    //   this.positionList = next;
    this.activeRouter.paramMap.subscribe(paramMap => {
      const idUser = +paramMap.get('id');
      // tslint:disable-next-line:no-shadowed-variable
      this.userService.findById(idUser).subscribe(next => {
        // @ts-ignore
        this.user = next;

        this.userForm.setValue(this.user);
      }, error => {
        this.router.navigateByUrl('user/list');
        this.toastrService.error('Không tìm thấy id.', 'Tin nhắn từ hệ thống');
      });
    });

  }


  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }

  submit() {
    this.userForm.get('code').setValue(this.user.code);
    this.userService.updateUser(this.userForm.value).subscribe(() => {
      this.router.navigateByUrl('user/list');
      this.toastrService.success('Cập nhật thông tin thành viên thành công.', 'Tin nhắn từ hệ thống');
      this.checkerr = true;
    }, error => {
      this.handleError(error);
      this.checkerr = false;
    });
  }


  handleError(code) {
    this.errorDB = code.error;
  }

  checkDateOfBirth(control: AbstractControl) {
    const dateOfBirth = new Date(control.value);
    if (new Date().getFullYear() - dateOfBirth.getFullYear() < 18 || new Date().getFullYear() - dateOfBirth.getFullYear() > 60) {
      return {checkAge: true};
    }
    return null;
  }

  // comparePosition(c1: Position, c2: Position): boolean {
  //   return c1 && c2 ? c1.id === c2.id : c1 === c2;
  // }

  get code() {
    return this.userForm.get('code');
  }

  get username() {
    return this.userForm.get('username');
  }

  get password() {
    return this.userForm.get('password');
  }

  get name() {
    return this.userForm.get('name');
  }

  get birthday() {
    return this.userForm.get('birthday');
  }

  get phone() {
    return this.userForm.get('phone');
  }

  get gender() {
    return this.userForm.get('gender');
  }

  get address() {
    return this.userForm.get('address');
  }

  get image() {
    return this.userForm.get('image');
  }

  get point() {
    return this.userForm.get('point');
  }

  get idCard() {
    return this.userForm.get('idCard');
  }

  get email() {
    return this.userForm.get('email');
  }

}
