import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class BadgesComponent implements OnInit {
  badges: any[] = [];
  haveBadges!: any;
  constructor(private _user: UserService) {}

  ngOnInit() {
    this._user.getUserBadges().subscribe((badges) => {
      delete badges[0].user_id;
      let b = Object.keys(badges[0]);
      this.badges.push(b.slice(0, 8));
      this.badges.push(b.slice(8, 16));
      this.badges.push(b.slice(16, 24));
      this.badges.push(b.slice(24, 32));
      this.badges.push(b.slice(32, 40));
      this.badges.push(b.slice(40, 48));
      console.log(this.badges);
      this.haveBadges = badges[0];
    });
  }
  nameOfGym(index: number) {
    switch (index) {
      case 0:
        return 'Kanto';
      case 1:
        return 'Johto';
      case 2:
        return 'Hoenn';
      case 3:
        return 'Sinnoh';
      case 4:
        return 'Unova';
      default:
        return 'Kalos';
    }
  }
}
