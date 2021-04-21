import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DashboardComponent } from './dashboard.component';
import { StoreModule } from '@ngrx/store';
import { featureKey } from './state/dashboard.selector';
import { DashboardReducers } from './state/dashboard.reducer';
import { DashboardEffects } from './services/dashboard.effects';
import { EffectsModule } from '@ngrx/effects';
import { NextGoalsComponent } from './components/next-goals/next-goals.component';
import { HighPriorityGoalsComponent } from './components/high-priority-goals/high-priority-goals.component';
import { ProgressTrackingComponent } from './components/progress-tracking/progress-tracking.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { HistoryComponent } from './components/history/history.component'

@NgModule({
  declarations: [DashboardComponent, NextGoalsComponent, HighPriorityGoalsComponent, ProgressTrackingComponent, HistoryComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,

    StoreModule.forFeature(featureKey, DashboardReducers),
    EffectsModule.forFeature([DashboardEffects]),
  ]
})
export class DashboardModule { }
