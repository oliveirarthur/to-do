import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoItemComponent } from './to-do-item/to-do-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToDoItemFormComponent } from './to-do-item-form/to-do-item-form.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangeStatusModalComponent } from './change-status-modal/change-status-modal.component';

@NgModule({
  declarations: [
    ToDoItemComponent,
    ToDoItemFormComponent,
    ChangeStatusModalComponent,
  ],
  exports: [ToDoItemComponent, ChangeStatusModalComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModalModule],
})
export class ComponentsModule {}
