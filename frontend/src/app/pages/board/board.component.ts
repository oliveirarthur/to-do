import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass'],
})
export class BoardComponent implements OnInit {
  toDos$ = new BehaviorSubject<any>([]);

  constructor(private toDoService: ToDoService) {}

  ngOnInit(): void {
    this.loadToDos();
  }

  async loadToDos() {
    const items = await this.toDoService.list();
    this.toDos$.next(items);
  }
}
