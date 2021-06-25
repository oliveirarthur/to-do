import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest } from 'rxjs';
import { ToDoService } from 'src/app/services/to-do.service';
import { IToDoItem } from 'src/interfaces/to-do';
import { ChangeStatusModalComponent } from '../change-status-modal/change-status-modal.component';
import { ToDoItemFormComponent } from '../to-do-item-form/to-do-item-form.component';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.sass'],
})
export class ToDoItemComponent implements OnInit {
  @Input() toDo: IToDoItem = {} as IToDoItem;

  isLoading = false;

  constructor(
    private modalService: NgbModal,
    private toDoService: ToDoService,
  ) {}

  ngOnInit(): void {}

  openEdit(toDo: IToDoItem) {
    const modalRef = this.modalService.open(ToDoItemFormComponent);
    const toDoItemFormComponentInstance =
      modalRef.componentInstance as ToDoItemFormComponent;
    toDoItemFormComponentInstance.toDo = toDo;
    toDoItemFormComponentInstance.ngOnChanges();
  }

  changeStatus(toDo: IToDoItem) {
    this.isLoading = true;
    if (toDo.is_complete) {
      const modalRef = this.modalService.open(ChangeStatusModalComponent);
      const toDoItemFormComponentInstance =
        modalRef.componentInstance as ToDoItemFormComponent;
      toDoItemFormComponentInstance.toDo = toDo;

      combineLatest([modalRef.closed, modalRef.dismissed]).subscribe(() => {
        this.isLoading = false;
      });
      return;
    }

    this.toDoService.changeStatus(toDo).subscribe(() => {
      this.isLoading = false;
    });
  }

  tooltip(toDo: IToDoItem) {
    if (toDo.is_complete && toDo.change_count >= 2) {
      return 'Este item  já foi alterado duas vezes';
    }
    if (toDo.is_complete) {
      return 'Mover para pendente';
    }
    return 'Mover para completo';
  }
}
