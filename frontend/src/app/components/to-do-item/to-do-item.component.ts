import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest } from 'rxjs';
import { ToDoService } from 'src/app/services/to-do.service';
import { IToDoItem } from 'src/interfaces/to-do';
import { ToDoItemFormComponent } from '../to-do-item-form/to-do-item-form.component';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.sass'],
})
export class ToDoItemComponent implements OnInit {
  @Input() toDo: IToDoItem = {} as IToDoItem;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  openEdit(toDo: IToDoItem) {
    const modalRef = this.modalService.open(ToDoItemFormComponent);
    const toDoItemFormComponentInstance =
      modalRef.componentInstance as ToDoItemFormComponent;
    toDoItemFormComponentInstance.toDo = toDo;
    toDoItemFormComponentInstance.ngOnChanges();
  }
}
