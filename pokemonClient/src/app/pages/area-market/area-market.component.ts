import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarketService } from 'src/app/services/market.service';

@Component({
  selector: 'app-area-market',
  templateUrl: './area-market.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class AreaMarketComponent implements OnInit {
  premiumItem: any[] = [];
  constructor(private _market: MarketService) {}

  ngOnInit() {
    this._market.getPremium().subscribe((p) => (this.premiumItem = p));
  }
}
