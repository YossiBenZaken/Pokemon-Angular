import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class RegisterComponent implements OnInit {
  countries: string[] = ['Belgium', 'England', 'Netherlands', 'Germany'];
  characters: { naam: string }[] = [];
  worlds: string[] = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos'];
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    password2: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    character: new FormControl('', Validators.required),
    world: new FormControl('', Validators.required),
  });
  constructor(private _auth: AuthService, private _router: Router) {
    this._auth
      .getCharacters()
      .subscribe((characters) => (this.characters = characters));
  }

  ngOnInit() {}
  onSubmit() {
    // validate value
    const {
      country: land,
      character: userCharacter,
      username: inlognaam,
      password: wachtwoordmd5,
      email,
      world: wereld,
    } = this.form.value;
    const body = {
      land,
      userCharacter,
      inlognaam,
      wachtwoordmd5,
      email,
      wereld,
    };
    const that = this;
    this._auth.register(body).subscribe({
      next(value) {
        that._router.navigateByUrl('/');
      },
      error(value) {
        // handle error
        console.log(value.error);
      },
    });
  }
}
