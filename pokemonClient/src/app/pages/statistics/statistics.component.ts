import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class StatisticsComponent implements OnInit {
  topStats: any;
  top5Silver: any[] = [];
  top5NumberOfPokemon: any[] = [];
  top5Fights: any[] = [];
  top10NewsMembers: any[] = [];
  constructor(private _stats: StatisticsService) {}

  ngOnInit() {
    // this._stats.top6Strongest().subscribe((e) => (this.top6Strongest = e));
    this._stats.topStats().subscribe((e) => (this.topStats = e[0]));
    this._stats.top5Silver().subscribe((e) => (this.top5Silver = e));
    this._stats
      .top5NumberOfPokemon()
      .subscribe((e) => (this.top5NumberOfPokemon = e));
    this._stats.top5Fights().subscribe((e) => (this.top5Fights = e));
    this._stats
      .top10NewsMembers()
      .subscribe((e) => (this.top10NewsMembers = e));
  }
}
