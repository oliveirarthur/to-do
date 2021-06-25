import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToDoService } from 'src/app/services/to-do.service';
import { IToDoItem } from 'src/interfaces/to-do';

@Component({
  selector: 'app-to-do-item-form',
  templateUrl: './to-do-item-form.component.html',
  styleUrls: ['./to-do-item-form.component.sass'],
})
export class ToDoItemFormComponent implements OnInit, OnChanges {
  @Input() toDo: IToDoItem = {} as IToDoItem;

  form = this.formBuilder.group({
    id: this.formBuilder.control(''),
    description: this.formBuilder.control(''),
    assignee: this.formBuilder.group({
      name: this.formBuilder.control(''),
      email: this.formBuilder.control(''),
    }),
  });
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private toDoService: ToDoService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.form.patchValue({
      id: this.toDo.id,
      description: this.toDo.description,
      assignee: {
        name: this.toDo.assignee.name,
        email: this.toDo.assignee.email,
      },
    });
  }

  updateToDoItem(item: IToDoItem) {
    this.isLoading = true;
    this.toDoService
      .save(item)
      .then(() => {
        this.modalService.dismissAll();
        alert('Atualizado com sucesso!');
      })
      .catch(() => {
        alert(
          'Ocorreu um erro ao atualizar o item, por favor, tente novamente.',
        );
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  cancel() {
    this.modalService.dismissAll();
  }
}
