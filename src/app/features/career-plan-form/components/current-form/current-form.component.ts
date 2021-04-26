import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Goal } from 'src/app/domain/goal.model';
import { DashboardActions } from 'src/app/features/dashboard/state/dashboard.actions';
import { DashboardSelectors } from 'src/app/features/dashboard/state/dashboard.selector';
import { GoalDialogComponent } from '../goal-dialog/goal-dialog.component';

@Component({
  selector: 'app-current-form',
  templateUrl: './current-form.component.html',
  styleUrls: ['./current-form.component.scss']
})
export class CurrentFormComponent implements OnInit {
  public goals$: Observable<Goal[]>;

  constructor(public dialog: MatDialog, private readonly store: Store) {

    this.store.dispatch(DashboardActions.getGoals());
    this.goals$ = this.store.select(DashboardSelectors.getGoals);
  }

  ngOnInit(): void {
  }

  openGoalDialog(): void {
    const dialogRef = this.dialog.open(GoalDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public headerClick(event): void {
    event.stopPropagation();
  }

}
