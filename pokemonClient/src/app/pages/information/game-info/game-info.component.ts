import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class GameInfoComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
