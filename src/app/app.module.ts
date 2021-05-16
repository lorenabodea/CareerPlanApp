import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavModule } from './common/side-nav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CareerPlanFormModule } from './features/career-plan-form/career-plan-form.module';
import { RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './state/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { LoginModule } from './features/login';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DashboardModule } from './features/dashboard';
import { CommentModule } from './common/comment/comment.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,

    StoreModule.forRoot({ app: appReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false
    }),
    EffectsModule.forRoot(),

    CareerPlanFormModule,
    DashboardModule,
    SideNavModule,
    LoginModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    CommentModule,
    NgbModule,

    AuthModule.forRoot({
      domain: 'careerplan.eu.auth0.com',
      clientId: '2KUVvc3IC6AjHPwjJTtQf9B8YhdqiLgj',
      audience: 'http://localhost:5000',

      httpInterceptor: {
        allowedList: [
          {uri: 'https://localhost:5001/api/goals'},
          {uri: 'http://localhost:4200/api/goals'},
          '/api/*'
        ]
      }
    }),

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
