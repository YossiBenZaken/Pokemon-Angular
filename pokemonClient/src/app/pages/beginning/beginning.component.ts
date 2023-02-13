import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { createSelector, Store } from '@ngrx/store';
import { UserInfo } from 'src/app/models/UserInfo.model';
import * as userSlice from '../../slices/user-slice';
@Component({
  selector: 'app-beginning',
  templateUrl: './beginning.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class BeginningComponent {
  constructor(private _router: Router, private readonly _store: Store) {
    this.user$.subscribe({
      next(value: UserInfo) {
        if (value.eigekregen !== 0) {
          _router.navigateByUrl('');
        }
      },
    });
  }
  user$ = this._store.select(
    createSelector(userSlice.selectFeature, (state) => state)
  );
  navigateToChoose() {
    this._router.navigateByUrl('/choose-pokemon');
  }
}
