import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { createSelector, Store } from '@ngrx/store';
import { AccountOptionsService } from 'src/app/services/account-options.service';
import * as userSlice from '../../../slices/user-slice';
@Component({
  selector: 'app-account-options-restart',
  templateUrl: './account-options-restart.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AccountOptionsRestartComponent {
  worlds: string[] = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos'];
  form = new FormGroup({
    password: new FormControl(''),
    world: new FormControl(''),
  });
  currentPass!: string;
  constructor(private _store: Store, private _account: AccountOptionsService) {
    _store
      .select(createSelector(userSlice.selectFeature, (state) => state))
      .subscribe((user) => (this.currentPass = user.wachtwoord));
  }
  onSubmit() {
    const { password, world } = this.form.value;
    if (password === this.currentPass) {
      this._account.reset({ world }).subscribe(() => {
        location.reload();
      });
    }
  }
}
