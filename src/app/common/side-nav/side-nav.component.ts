import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  public isExpanded: boolean = false;

  constructor(
    private readonly auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.auth.logout();
  }

}
