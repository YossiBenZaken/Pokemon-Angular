import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { map, share, Subscription, timer } from 'rxjs';
import { ranks } from 'src/app/mocks/rank';
import * as userSlice from '../../slices/user-slice';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  time = new Date();
  timeSubscribe!: Subscription;
  constructor(private readonly _store: Store) {}

  user$ = this._store.select(
    createSelector(userSlice.selectFeature, (state) => state)
  );

  ngOnInit() {
    this.timeSubscribe = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe((time) => {
        this.time = time;
      });
  }
  ngOnDestroy(): void {
    if (this.timeSubscribe) {
      this.timeSubscribe.unsubscribe();
    }
  }
  getRank(rank: number) {
    return ranks.filter((r) => Number(r.ranknummer) === rank)[0];
  }
  round(num: number) {
    return Math.round(num);
  }
  percentPokemon(pokemons: string) {
    return this.round((pokemons.split(',').length / 650) * 100);
  }
}
