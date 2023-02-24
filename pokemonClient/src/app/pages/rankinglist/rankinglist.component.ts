import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ranks } from 'src/app/mocks/rank';
import { RankinglistService } from 'src/app/services/rankinglist.service';

@Component({
  selector: 'app-rankinglist',
  templateUrl: './rankinglist.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class RankinglistComponent implements OnInit {
  subpage: number = 1;
  max: number = 50;
  numOfPages: number = 0;
  page: number = 0;
  ranks: any[] = [];
  constructor(private _rankinglist: RankinglistService) {}

  ngOnInit() {
    this._rankinglist.getRankingList().subscribe((rank: any[]) => {
      this.numOfPages = Math.ceil(rank.length / this.max);
      this.page = this.subpage * this.max - this.max;
      this.ranks = rank;
    });
  }

  listOfRankPerPage() {
    console.log(this.ranks, this.page, this.page + this.max);
    return this.ranks.slice(this.page, this.page + this.max);
  }

  getMedal(index: number): string {
    if (index === 1) return '../../../assets/images/icons/plaatsnummereen.png';
    if (index === 2) return '../../../assets/images/icons/plaatsnummertwee.png';
    if (index === 3) return '../../../assets/images/icons/plaatsnummerdrie.png';
    if (index > 3 && index <= 10)
      return '../../../assets/images/icons/gold_medaille.png';
    if (index > 10 && index <= 30)
      return '../../../assets/images/icons/silver_medaille.png';
    if (index > 30 && index <= 50)
      return '../../../assets/images/icons/bronze_medaille.png';
    return '';
  }

  getRank(rank: number) {
    return ranks.filter((r) => r.ranknummer === rank.toString())[0].ranknaam;
  }

  isOnline(online: string): boolean {
    if (online.trim() !== '')
      return (
        new Date((Number(online) + 300) * 1000).getTime() > new Date().getTime()
      );
    return false;
  }

  listOfPagination() {
    let arr: number[] = [];
    for (let i = 1; i <= this.numOfPages; i++) {
      arr.push(i);
    }
    return arr;
  }
  changePage(subpage: number) {
    this.subpage = subpage;
    this.page = this.subpage * this.max - this.max;
  }
}
