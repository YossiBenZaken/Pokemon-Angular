import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { createSelector, Store } from '@ngrx/store';
import { UserInfo } from './models/UserInfo.model';
import { LoginComponent } from './pages/login/login.component';
import { MyTeamComponent } from './pages/my-team/my-team.component';
import { OnlineComponent } from './pages/online/online.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserService } from './services/user.service';
import * as userSlice from './slices/user-slice';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoginComponent,
    UserDetailsComponent,
    MyTeamComponent,
    OnlineComponent,
  ],
})
export class AppComponent {
  title = 'pokemonClient';
  isLogin = false;
  isAdmin = false;
  constructor(
    private _user: UserService,
    private _router: Router,
    private readonly _store: Store<{}>
  ) {
    this.handleUser();
    this.user$.subscribe((user) => {
      if (user.token != '') {
        this.isLogin = true;
        this.isAdmin = user.admin >= 1;
      }
    });
  }
  user$ = this._store.select(
    createSelector(userSlice.selectFeature, (state) => state)
  );
  logout() {
    this.isLogin = false;
    this.isAdmin = false;
    this._store.dispatch(userSlice.logout());
  }
  handleUser() {
    this._user.getUserInfo().subscribe(
      (info: UserInfo) => {
        this.isAdmin = info.admin >= 1;
        this._store.dispatch(userSlice.updateUser(info));
        this.isLogin = true;
        this._store.dispatch(
          userSlice.setToken(localStorage.getItem('token')!)
        );
        if (info.eigekregen == 0) {
          this._router.navigateByUrl('/beginning');
        }
      },
      (err) => {
        localStorage.clear();
        this.isLogin = false;
      }
    );
  }
}
