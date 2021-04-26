import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment.component';
import { CommentboxComponent } from './commentbox/commentbox.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChildboxComponent } from './childbox/childbox.component';
import { CommentsComponent } from './comments/comments.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [CommentComponent, CommentboxComponent, ChildboxComponent, CommentsComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,

  ],
  exports: [
    CommentComponent, CommentboxComponent, ChildboxComponent, CommentsComponent
  ]
})
export class CommentModule { }
