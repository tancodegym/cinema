import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {UserCreate} from "../../model/UserCreate";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/storage";
import {formatDate} from "@angular/common";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  user: UserCreate;
  confirmPassword: string;
  userForm: FormGroup;
  image: any;
  constructor(private userService: UserService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
    this.userForm = new FormGroup({

      username: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴÝỶỸửữựỵ ỷỹ]*$')]),

      password: new FormControl(''),

      confirmPassword: new FormControl(''),

      image: new FormControl(),

      name: new FormControl(''),

      birthday: new FormControl(''),

      gender: new FormControl(''),

      idCard: new FormControl(''),

      email: new FormControl(''),

      phone: new FormControl(''),

      address: new FormControl(''),
    })
  }

  ngOnInit(): void {
  }

  setImage(event: any) {
    this.image = event.target.files[0];
  }

  createUser() {
    console.log("1");

    if(this.image != null){
      const nameImg = this.getCurrentDateTime() + this.image;
      const fileRef = this.storage.ref(nameImg);
      this.storage.upload(nameImg, this.image).snapshotChanges().pipe(
        finalize(() => {
          // tslint:disable-next-line:no-shadowed-variable
          fileRef.getDownloadURL().subscribe((url) => {
            // tslint:disable-next-line:max-line-length
            this.userForm.patchValue({image: url + ''});
            this.user = this.userForm.value;
            this.userService.saveUser(this.user).subscribe(() => {
              alert('Tạo thành công');
            }, error => {
              alert('Tạo thất bại');
            });
          });
        })
      ).subscribe();
    }else {
     this.user = this.userForm.value;
      console.log(this.user);
      this.userService.saveUser(this.userForm.value).subscribe(() => {
        alert('Tạo thành công');
      }, error => {
        alert('Tạo thất bại');
      });
    };
  }

  private getCurrentDateTime() {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
}
