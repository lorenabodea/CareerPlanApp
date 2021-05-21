import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
//import { AuthService } from './auth/auth.service';

import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CareerPlanClient';

  constructor(
  //  public auth: AuthService,
    private http: HttpClient
  ) { 
    //this.auth.userProfile$.subscribe(result => console.log(result));
  }

  weatherItems: any = [];

  ngOnInit() {
  }
}
