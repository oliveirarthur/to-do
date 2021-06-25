import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IToDoItem } from 'src/interfaces/to-do';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  constructor(private http: HttpClient) {}

  private readonly base_url = `${environment.backend.base_url}to-do/`;

  list() {
    return this.http.get<Array<IToDoItem>>(this.base_url);
  }

  save(item: IToDoItem) {
    const id = item.id || '';
    if (id) {
      return this.http.put(`${this.base_url}${id}`, item);
    }
    return this.http.post(`${this.base_url}`, item);
  }

  changeStatus(item: IToDoItem, password?: string) {
    return this.http.post<Array<IToDoItem>>(
      `${this.base_url}${item.id}/change-status`,
      { password },
    );
  }

  outOfTasks() {
    return this.http.get<Array<IToDoItem>>(`${this.base_url}out-of-tasks`);
  }
}
