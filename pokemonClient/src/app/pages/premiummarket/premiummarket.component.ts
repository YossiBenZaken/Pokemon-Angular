import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MarketService } from 'src/app/services/market.service';

@Component({
  selector: 'app-premiummarket',
  templateUrl: './premiummarket.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class PremiummarketComponent {
  items: any[] = [];
  constructor(private _market: MarketService) {
    _market.getPremiumItems().subscribe((items) => (this.items = items));
  }
}
