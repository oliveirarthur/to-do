import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoItemComponent } from './to-do-item/to-do-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ToDoItemComponent],
  exports: [ToDoItemComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class ComponentsModule {}
