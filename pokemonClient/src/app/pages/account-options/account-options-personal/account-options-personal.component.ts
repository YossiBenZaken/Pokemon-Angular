import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { createSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserInfo } from 'src/app/models/UserInfo.model';
import { AccountOptionsService } from 'src/app/services/account-options.service';
import * as userSlice from '../../../slices/user-slice';

@Component({
  selector: 'app-account-options-personal',
  templateUrl: './account-options-personal.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class AccountOptionsPersonalComponent implements OnInit {
  form = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    teamzien: new FormControl('0'),
    buddieszien: new FormControl('0'),
    badgeszien: new FormControl('0'),
    dueluitnodiging: new FormControl('0'),
    battleScreen: new FormControl('0'),
  });
  user$!: Observable<UserInfo>;
  constructor(
    private readonly _store: Store,
    private _account: AccountOptionsService
  ) {}
  ngOnInit(): void {
    this.user$ = this._store.select(
      createSelector(userSlice.selectFeature, (state) => state)
    );
    this.user$.subscribe((user) => {
      this.form.controls.firstname.setValue(user.voornaam);
      this.form.controls.lastname.setValue(user.achternaam);
      this.form.controls.teamzien.setValue(user.teamzien.toString());
      this.form.controls.buddieszien.setValue(user.buddieszien.toString());
      this.form.controls.badgeszien.setValue(user.badgeszien.toString());
      this.form.controls.dueluitnodiging.setValue(
        user.dueluitnodiging.toString()
      );
      this.form.controls.battleScreen.setValue(user.battleScreen.toString());
    });
  }
  onSubmit() {
    this._account.personal(this.form.value).subscribe(
      () => {
        this._store.dispatch(
          userSlice.personal({
            firstname: this.form.value.firstname!,
            lastname: this.form.value.lastname!,
            buddieszien: this.form.value.buddieszien!,
            teamzien: this.form.value.teamzien!,
            badgeszien: this.form.value.badgeszien!,
            dueluitnodiging: this.form.value.dueluitnodiging!,
            battleScreen: this.form.value.battleScreen!,
          })
        );
      },
      (err) => console.error(err)
    );
  }
}
