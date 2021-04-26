import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DashboardActions } from 'src/app/features/dashboard/state/dashboard.actions';
import { Goal } from 'src/app/domain/goal.model';
import { Observable } from 'rxjs';
import { DashboardSelectors } from 'src/app/features/dashboard/state/dashboard.selector';

export interface DialogData {
  title: string;
  subtasks: string[];
  recurring: boolean;
  effort: number;
  deadline: string;
}

@Component({
  selector: 'app-goal-dialog',
  templateUrl: './goal-dialog.component.html',
  styleUrls: ['./goal-dialog.component.scss']
})
export class GoalDialogComponent implements OnInit {

  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<GoalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private readonly store: Store,
  ) {
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      tasks: this.fb.array([this.fb.group({
        description: ['', Validators.required],
        recurringType: '',
        duedate: '',
        effort: ['', Validators.required],
      })]),
    })
  }

  // to do later
  public onTaskEnter(event): void {
    console.log(event);
  }

  get tasks() {
    return this.form.get('tasks') as FormArray;
  }

  public addTask(): void {
    if (this.tasks.valid) {
      this.tasks.push(this.fb.group({
        description: '',
        recurringType: '',
        duedate: '',
        effort: '',
      }))
    }
  }

  public removeTask(index: number): void {
    this.tasks.removeAt(index);
  }

  public onSubmit(goal: Goal): void {
    if (this.form.valid) {
      this.store.dispatch(DashboardActions.createGoal({ goal }))

      this.dialogRef.close()
    }
  }

  public onCancelClick(): void {
    this.dialogRef.close();
  }
}
