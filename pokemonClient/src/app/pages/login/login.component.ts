import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserInfo } from 'src/app/models/UserInfo.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import * as userSlice from '../../slices/user-slice';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  submitted: boolean = false;
  constructor(
    private _auth: AuthService,
    private _store: Store,
    private _user: UserService
  ) {}

  ngOnInit() {}
  onSubmit() {
    this.submitted = true;
    this._auth.login(this.form.value).subscribe((login: any) => {
      localStorage.setItem('token', login.token);
      this._store.dispatch(userSlice.setToken(login.token));
      this.handleUser();
    });
  }
  handleUser() {
    this._user.getUserInfo().subscribe(
      (info: UserInfo) => {
        this._store.dispatch(userSlice.updateUser(info));
      },
      (err) => {
        localStorage.clear();
      }
    );
  }
  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }
}
