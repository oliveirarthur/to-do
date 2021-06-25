import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, interval, timer } from 'rxjs';
import { ToDoItemFormComponent } from 'src/app/components/to-do-item-form/to-do-item-form.component';
import { ToDoService } from 'src/app/services/to-do.service';
import { IToDoItem } from 'src/interfaces/to-do';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass'],
})
export class BoardComponent implements OnInit {
  toDos$ = new BehaviorSubject<any>({
    completed: [],
    pending: [],
  });

  constructor(
    private toDoService: ToDoService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    // FIXME: implement websocket
    const timer = interval(1000)
      .pipe(
        startWith(0),
        switchMap(() => this.toDoService.list()),
      )
      .subscribe(async (items) => {
        const completed = items.filter((item) => item.is_complete);
        const pending = items.filter((item) => !item.is_complete);
        if (
          completed.length !== this.toDos$.value.completed.length ||
          pending.length !== this.toDos$.value.pending.length
        ) {
          this.toDos$.next({
            completed,
            pending,
          });
        }
      });
  }

  openNew() {
    const modalRef = this.modalService.open(ToDoItemFormComponent);
  }
}
