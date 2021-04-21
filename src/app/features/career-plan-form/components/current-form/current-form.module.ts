import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { CurrentFormComponent } from './current-form.component';
import { GoalDialogModule } from '../goal-dialog';

@NgModule({
  declarations: [CurrentFormComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,

    GoalDialogModule
  ],
  exports: [CurrentFormComponent]
})
export class CurrentFormModule { }
