import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserInfo } from './models/UserInfo.model';
import { LoginComponent } from './pages/login/login.component';
import { UserService } from './services/user.service';
import * as userSlice from './slices/user-slice';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, LoginComponent],
})
export class AppComponent {
  title = 'pokemonClient';
  constructor(
    private _user: UserService,
    private _router: Router,
    private readonly _store: Store<{}>
  ) {
    this._user.getUserInfo().subscribe((info: UserInfo) => {
      this._store.dispatch(userSlice.updateUser(info));
      if (info.eigekregen == 0) {
        _router.navigateByUrl('/beginning');
      }
    });
  }
}
