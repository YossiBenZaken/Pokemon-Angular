import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
