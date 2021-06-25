import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToDoService } from 'src/app/services/to-do.service';
import { IToDoItem } from 'src/interfaces/to-do';

@Component({
  selector: 'app-change-status-modal',
  templateUrl: './change-status-modal.component.html',
  styleUrls: ['./change-status-modal.component.sass'],
})
export class ChangeStatusModalComponent implements OnInit {
  @Input() toDo: IToDoItem = {} as IToDoItem;

  password = '';
  isLoading = false;

  constructor(
    private modalService: NgbModal,
    private toDoService: ToDoService,
  ) {}

  ngOnInit(): void {}

  changeStatus(toDo: IToDoItem, password: string) {
    this.isLoading = true;
    this.toDoService.changeStatus(toDo, password).subscribe(
      () => {
        this.modalService.dismissAll();
      },
      ({ error }: HttpErrorResponse) => {
        const message =
          error.message ?? 'Ocorreu um erro, por favor, tente novamente';
        alert(message);
      },
      () => {
        this.isLoading = false;
      },
    );
  }
}
