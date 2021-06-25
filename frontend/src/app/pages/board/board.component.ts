import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { ToDoItemFormComponent } from 'src/app/components/to-do-item-form/to-do-item-form.component';
import { ToDoService } from 'src/app/services/to-do.service';
import { IToDoItem } from 'src/interfaces/to-do';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass'],
})
export class BoardComponent implements OnInit {
  toDos$ = new BehaviorSubject<any>([]);

  constructor(
    private toDoService: ToDoService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.loadToDos();
  }

  async loadToDos() {
    const items = await this.toDoService.list();
    this.toDos$.next(items);
  }

  openNew() {
    const modalRef = this.modalService.open(ToDoItemFormComponent);
  }
}
