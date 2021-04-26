import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CareerPlanClient';

  constructor(
    public auth: AuthService,
    private http: HttpClient
  ) { }

  weatherItems: any = [];

  ngOnInit() {
  }
}
