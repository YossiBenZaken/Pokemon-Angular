import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buddies',
  templateUrl: './buddies.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class BuddiesComponent implements OnInit {
  myfriends: any[] = [];
  requested: any[] = [];
  constructor() {}

  ngOnInit() {}
}
