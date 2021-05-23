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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryComponent } from './components/history/history.component'
import { CommentModule } from 'src/app/common/comment/comment.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MdePopoverModule } from '@material-extended/mde';
import { MatCardModule } from '@angular/material/card';
import { CommentDialogComponent, DatacontainerDirective } from './components/comment-doalog/comment-doalog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ChartsModule } from 'ng2-charts';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [DashboardComponent, NextGoalsComponent, HighPriorityGoalsComponent, ProgressTrackingComponent, HistoryComponent, CommentDialogComponent, DatacontainerDirective],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    CommentModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MdePopoverModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    ChartsModule,
    MatTabsModule,
    StoreModule.forFeature(featureKey, DashboardReducers),
    EffectsModule.forFeature([DashboardEffects]),
  ]
})
export class
  DashboardModule { }
