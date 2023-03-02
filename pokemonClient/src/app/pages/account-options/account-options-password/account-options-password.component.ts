import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { createSelector, Store } from '@ngrx/store';
import { AccountOptionsService } from 'src/app/services/account-options.service';
import * as userSlice from '../../../slices/user-slice';
@Component({
  selector: 'app-account-options-password',
  templateUrl: './account-options-password.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AccountOptionsPasswordComponent {
  form = new FormGroup({
    newPass: new FormControl(''),
    confirmPass: new FormControl(''),
    currentPass: new FormControl(''),
  });
  currentPass!: string;
  constructor(
    private readonly _store: Store,
    private _account: AccountOptionsService
  ) {
    this._store
      .select(createSelector(userSlice.selectFeature, (state) => state))
      .subscribe((user) => {
        this.currentPass = user.wachtwoord;
      });
  }
  onSubmit() {
    if (
      this.form.value.confirmPass === this.form.value.newPass &&
      this.currentPass === this.form.value.currentPass
    ) {
      this._account.password({ newPass: this.form.value.newPass }).subscribe(
        () => {
          this._store.dispatch(
            userSlice.password({
              newPass: this.form.value.newPass!,
            })
          );
        },
        (err) => console.error(err)
      );
    }
  }
}
