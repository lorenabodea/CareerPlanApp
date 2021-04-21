import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

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

  checked = false;

  constructor(
    public dialogRef: MatDialogRef<GoalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [''],
      tasks: this.fb.array([this.fb.group({
        description: '',
        recurringType: '',
        duedate: '',
        effort: '',
      })]),
    })
  }

  public onCancelClick(): void {
    this.dialogRef.close();
  }

  // to do later
  public onTaskEnter(event): void {
    console.log(event);
  }

  public onSubmit(formValue): void {
    console.log(formValue);

  }

  get tasks() {
    return this.form.get('tasks') as FormArray;
  }

  addTask() {
    this.tasks.push(this.fb.group({
      description: '',
        recurringType: '',
        duedate: '',
        effort: '',
    }))
  }
}
