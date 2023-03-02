import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { createSelector, Store } from '@ngrx/store';
import { catchError, map, Observable, of } from 'rxjs';
import { UserInfo } from '../models/UserInfo.model';
import * as userSlice from '../slices/user-slice';
@Injectable({
  providedIn: 'root',
})
export class UserGuardService implements CanActivate {
  constructor(private readonly _store: Store<{}>, private _router: Router) {}
  user$ = this._store.select(
    createSelector(userSlice.selectFeature, (state) => state)
  );
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.user$.pipe(
      map((userInfo: UserInfo) => {
        console.log(userInfo);
        if (userInfo.user_id === 0) {
          this.unauthorizedHandler();
        }
        return userInfo.user_id !== 0;
      }),
      catchError((err) => {
        this.unauthorizedHandler();
        return of(false);
      })
    );
  }
  private unauthorizedHandler(): void {
    alert('You are not authorized to perform this operation');
    this._router.navigate(['/']);
  }
}
