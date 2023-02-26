import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class OnlineComponent implements OnInit {
  online: any[] = [];
  constructor(private _auth: AuthService) {}

  ngOnInit() {
    this._auth.online().subscribe((o) => (this.online = o));
  }
}
