import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
//import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public goals: any = [];

  constructor(
   // public auth: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

}
