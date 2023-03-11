import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { Item } from 'src/app/models/Item.model';
import { UserInfo } from 'src/app/models/UserInfo.model';
import { MarketService } from 'src/app/services/market.service';
import { UserService } from 'src/app/services/user.service';
import * as userSlice from '../../slices/user-slice';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class ItemsComponent implements OnInit {
  balls: Item[] = [];
  potions: Item[] = [];
  items: Item[] = [];
  userItems!: any;
  spcitems: Item[] = [];
  stones: Item[] = [];
  tm: Item[] = [];
  hm: Item[] = [];
  megastones: Item[] = [];
  user!: UserInfo;
  constructor(
    private _store: Store,
    private _market: MarketService,
    private _user: UserService
  ) {
    this._store
      .select(createSelector(userSlice.selectFeature, (state) => state))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit() {
    this._user
      .getUserItems()
      .subscribe((userItem) => (this.userItems = userItem));
    this._market.getItems().subscribe((items) => {
      this.balls = items.filter((item) => item.soort == 'balls');
      this.megastones = items.filter((item) => item.soort == 'megastone');
      this.potions = items.filter((item) => item.soort == 'potions');
      this.items = items.filter((item) => item.soort == 'items');
      this.stones = items.filter((item) => item.soort == 'stones');
      this.tm = items.filter((item) => item.soort == 'tm');
      this.hm = items.filter((item) => item.soort == 'hm');
      this.spcitems = items.filter((item) =>
        [
          'special items',
          'mega',
          'krone',
          'newyear',
          'narceus',
          'rare candy',
        ].includes(item.soort)
      );
    });
  }
  getRoomMax() {
    switch (this.user.itembox) {
      case 'Bag':
        return 20;
      case 'Red box':
        return 250;
      case 'Blue box':
        return 100;
      case 'Yellow box':
        return 50;
      default:
        return 500;
    }
  }
  megaName(item: Item) {
    let name = item.naam.replace(' ', '_');

    return name[0].toUpperCase() + name.substring(1).toLowerCase();
  }
  checkItems(arg: string) {
    let flag = false;
    switch (arg) {
      case 'megastones':
        this.megastones.forEach((el) => {
          if (this.userItems[el.naam] > 0) {
            flag = true;
          }
        });
        break;
      case 'balls':
        this.balls.forEach((el) => {
          if (this.userItems[el.naam] > 0) {
            flag = true;
          }
        });
        break;
      case 'potions':
        this.potions.forEach((el) => {
          if (this.userItems[el.naam] > 0) {
            flag = true;
          }
        });
        break;
      case 'items':
        this.items.forEach((el) => {
          if (this.userItems[el.naam] > 0) {
            flag = true;
          }
        });
        break;
      case 'spcitems':
        this.spcitems.forEach((el) => {
          if (this.userItems[el.naam] > 0) {
            flag = true;
          }
        });
        break;
      case 'stones':
        this.stones.forEach((el) => {
          if (this.userItems[el.naam] > 0) {
            flag = true;
          }
        });
        break;
      case 'tm':
        this.tm.forEach((el) => {
          if (this.userItems[el.naam] > 0) {
            flag = true;
          }
        });
        break;
      case 'hm':
        this.hm.forEach((el) => {
          if (this.userItems[el.naam] > 0) {
            flag = true;
          }
        });
        break;
    }
    return flag;
  }
  getType(hm: string) {
    switch (hm) {
      case 'HM01':
        return 'Grass';
      case 'HM02':
        return 'Flying';
      case 'HM03':
      case 'HM07':
      case 'HM08':
        return 'Water';
      case 'HM 04':
      case 'HM 06':
        return 'Fighting';
      default:
        return 'Electric';
    }
  }
}
