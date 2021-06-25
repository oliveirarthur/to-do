import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoItemComponent } from './to-do-item/to-do-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToDoItemFormComponent } from './to-do-item-form/to-do-item-form.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ToDoItemComponent, ToDoItemFormComponent],
  exports: [ToDoItemComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModalModule],
})
export class ComponentsModule {}
